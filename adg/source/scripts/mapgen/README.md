Regenerates `src/data/map.json` (dotted land, city positions, corridor paths).

```bash
cd scripts/mapgen
npm init -y && npm i d3-geo d3-shape topojson-client world-atlas@2
node gen.mjs && cp map.json ../../src/data/map.json
```

Add a market: put its city in `cities`, add a route in `routes` (lon/lat waypoints at sea), re-run.
