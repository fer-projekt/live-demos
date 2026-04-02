/*
Special Thanks - noirsociety
Codepen URL - https://codepen.io/noirsociety/pen/BaGNrdz
*/

const magnet = document.querySelector(".magnet");
const cursor = document.querySelector(".magnet-cursor");
const circle = document.querySelector(".magnet-circle");

if (magnet) {
    const mobileView = window.matchMedia("(max-width: 991.98px)");
    let [startX, startY, endX, endY] = [0, 0, 0, 0];
    let time = 0.1;
    let raf;
    let isEnabled = false;

    const lerp = (start, end, t) => start * (1 - t) + end * t;

    function resetCursorState() {
      magnet.classList.remove("reset");
      [startX, startY, endX, endY] = [0, 0, 0, 0];
      cursor.style.removeProperty("--x");
      cursor.style.removeProperty("--y");
      cursor.style.transform = "";
      circle.style.transform = "";
      cancelAnimationFrame(raf);
    }

    function updateCircle() {
      startX = lerp(startX, endX, time);
      startY = lerp(startY, endY, time);
      circle.style.transform = `translate(${startX}px,${startY}px)`;
      raf = requestAnimationFrame(updateCircle);
      startX.toFixed(1) === endX.toFixed(1) && cancelAnimationFrame(raf);
    }

    function trackCircle(e) {
      endX = e.clientX - circle.clientWidth / 2;
      endY = e.clientY - circle.clientHeight / 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateCircle);
    }

    function trackCursor(e) {
      cursor.style.setProperty("--x", `${e.clientX - cursor.clientWidth / 2}px`);
      cursor.style.setProperty("--y", `${e.clientY - cursor.clientHeight / 2}px`);
      magnet.classList.remove("reset");
    }

    function init(e) {
      if (!isEnabled) {
        return;
      }

      trackCursor(e);
      trackCircle(e);

      if (e.target.matches(".magnet-link")) {
        magnet.classList.add("reset");
      }
    }

    function toggleMagnetCursor(event) {
      isEnabled = !event.matches;
      magnet.hidden = !isEnabled;

      if (!isEnabled) {
        resetCursorState();
      }
    }

    window.addEventListener("pointermove", init, false);
    toggleMagnetCursor(mobileView);

    if (typeof mobileView.addEventListener === "function") {
      mobileView.addEventListener("change", toggleMagnetCursor);
    } else if (typeof mobileView.addListener === "function") {
      mobileView.addListener(toggleMagnetCursor);
    }
}
