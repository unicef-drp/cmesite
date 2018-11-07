# data map
[ ] slider
[ ] legend
[?] country selector behavior
[?] time selector behavior (impact on request)
[x] Can't call setState (or forceUpdate) on an unmounted component (no data and select all)
[ ] trigger data request in home at start
[x] load topojson of unicef
[x] parse it to bind its ids to sdmx (if not already done)
[ ] bind sdmx data to ids for tooltips and values (choropleth)
[ ] zoom
[x] projection
[ ] tooltip with button

# chart
[ ] tooltip position
[ ] compare estimate color

# sdmx
[ ] work around selection
[ ] lib/sdmx/data.js y0 and y1 mocked
[ ] api/sdmx.js mocked
[ ] DataNote source
[ ] download headers

# perf
[ ] Chart is re-rendered when switching tabs and when expanding Legend
[ ] changing a selection rerender all tabs
[ ] sdmx data request is too heavy when all selected

# unicef
[ ] data icons/style tabs
[ ] page(s) width and map size
[ ] selectors style
[ ] WP backup WP-DB-Backup (daily)
[!] logos are small, need png not ai, images (ie home) are too big
[!] space between chart and side (not aesthetic)

# deploy
[ ] staging and qa with real endpoint
[ ] make a bundle for daniele (with proper config)

---

# SEO

# bonus

## dimensions
[ ] remove SEX dimension for configured INDICATOR values (disagreggated)

## legend
[ ] symbols with line (not only symbol)
[ ] hover interaction

## chart
[ ] different symbols regarding SERIES_METHOD

## config
[ ] handle locale
