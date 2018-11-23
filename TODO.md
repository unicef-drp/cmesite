# TODO

## requests/selections
- [x] initial request in home
- [x] initial request in map
- [x] change selection, reset mapIndex
- [x] default compare country is the one from country
- [x] click on country to go on tab country with proper selection
- [x] block requests if no selection
- [x] block requests if too many selection (20 combined)
- [ ] go from home to data by selecting a country (no load data triggered)
- [ ] no data in compare, invalid selection message in chart/map

## map
- [x] legend (position/responsive)
- [x] zoom
- [x] tooltip
- [x] bug in map, colors are no aligned with values
- [x] rework legend tresholds
- [x] map slider show year only

## chart
- [x] no curve monotone x
- [x] add yaxis label 'per thousand'
- [x] hide negative values in yaxis
- [ ] update chart title when switching from compare to country
- [ ] tooltip labels (country, compare, SERIES_NAME, SERIES_CATEGORY, SERIES_TYPE, SERIES_YEAR and country for compare)
- [ ] legend symbol: lines for estimate et uncertainty
- [ ] legend labels (country, compare, SERIES_NAME and indicators values, need country in compare)
- [ ] extent always take uncertainty into account
- [ ] add ticks for the starting value in chart
- [ ] tooltip position

## sdmx
- [ ] download headers

## bugs
- [x] bug can't type in home country selector
- [ ] datasource, reduce white space due to swipeable

## misc
- [x] no data -> choose a country
- [x] space between news in home page (xs)
- [ ] check reports in several langs
- [ ] contact us in about
- [ ] footer links

## unicef
- [ ] data icons/style tabs
- [ ] WP backup WP-DB-Backup (daily)
- [ ] DataNote source (one par tab or per all?)
- [ ] SEO aspect, post release (https://web.dev/measure?authuser=1)
- [ ] GA

---

## dimensions
- [ ] remove SEX dimension for configured INDICATOR values (disagreggated)
- [ ] collapsable download box
- [ ] swipeable avoid rendering, collapse states are reset (collapse, switch tabs, expanded!)

## chart
- [ ] different symbols regarding SERIES_METHOD

## config
- [ ] put constants in config, remove hardcoded config in index.js
- [ ] handle locale
