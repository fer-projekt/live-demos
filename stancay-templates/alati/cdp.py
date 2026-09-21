import asyncio, json, sys, urllib.request, websockets

class Browser:
    def __init__(self, port=9333):
        self.port = port; self.i = 0
    async def __aenter__(self):
        for _ in range(40):
            try:
                d = json.load(urllib.request.urlopen(f"http://127.0.0.1:{self.port}/json/list", timeout=2))
                pages = [t for t in d if t["type"] == "page"]
                if pages:
                    self.ws = await websockets.connect(pages[0]["webSocketDebuggerUrl"], max_size=80*1024*1024)
                    await self.send("Page.enable"); await self.send("Runtime.enable")
                    return self
            except Exception:
                pass
            await asyncio.sleep(0.5)
        raise RuntimeError("Chrome nije odgovorio na portu %d" % self.port)
    async def __aexit__(self, *a):
        try: await self.ws.close()
        except Exception: pass
    async def send(self, method, **params):
        self.i += 1; mid = self.i
        await self.ws.send(json.dumps({"id": mid, "method": method, "params": params}))
        while True:
            msg = json.loads(await self.ws.recv())
            if msg.get("id") == mid:
                if "error" in msg: raise RuntimeError(f"{method}: {msg['error']}")
                return msg.get("result", {})
    async def goto(self, url, wait=3.0):
        await self.send("Page.navigate", url=url)
        await asyncio.sleep(wait)
    async def js(self, expr, wait_promise=True):
        r = await self.send("Runtime.evaluate", expression=expr, returnByValue=True,
                            awaitPromise=wait_promise, userGesture=True)
        if r.get("exceptionDetails"):
            return {"__error": str(r["exceptionDetails"].get("exception", {}).get("description", ""))[:300]}
        return r.get("result", {}).get("value")
