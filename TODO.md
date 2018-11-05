# data map
[ ] slider
[ ] legend
[?] country selector behavior
[?] time selector behavior (impact on request)
[ ] Can't call setState (or forceUpdate) on an unmounted component (no data and select all)
[ ] trigger data request in home at start
[ ] load topojson of unicef
[ ] parse it to bind its ids to sdmx (if not already done)
[ ] bind sdmx data to ids for tooltips and values (choropleth)
[ ] zoom

# chart
[ ] chart has no proptypes
[ ] extent y1, y0
[ ] tooltip area
[ ] zoom in lines

# sdmx
[ ] lib/sdmx/data.js y0 and y1 mocked
[ ] api/sdmx.js mocked
[ ] DataNote source
[ ] download headers

# perf
[ ] Chart is re-rendered when switching tabs and when expanding Legend
[ ] sdmx data request is too heavy when all selected

# unicef
[ ] data icons/style tabs
[ ] page(s) width and map size
[ ] selectors style
[ ] WP backup WP-DB-Backup (daily)
[!] logos are small, need png not ai, images (ie home) are too big
[!] space between chart and side (not aesthetic)

---

# bonus

## legend
[ ] symbols with line (not only symbol)
[ ] hover interaction

## chart
[ ] different symbols regarding SERIES_METHOD

## tooltips
[ ] handle compact zones
[ ] handle edge positions
[ ] alter marker on over

## config
[ ] handle locale