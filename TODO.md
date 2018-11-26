# TODO

## requests/selections
- [x] initial request in home
- [x] initial request in map
- [x] change selection, reset mapIndex
- [x] default compare country is the one from country
- [x] click on country to go on tab country with proper selection
- [x] block requests if no selection
- [x] block requests if too many selection (20 combined)
- [x] go from home to data by selecting a country (no load data triggered)
- [x] go back to home, no request triggered
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
- [x] tooltip labels (country, compare, SERIES_NAME, SERIES_CATEGORY, SERIES_TYPE, SERIES_YEAR and country for compare)
- [x] legend labels (country, compare, SERIES_NAME and indicators values, need country in compare)
- [x] legend symbol: lines for estimate and uncertainty
- [x] different symbols regarding SERIES_METHOD
- [x] add ticks for the starting value in chart
- [ ] update chart title when switching from compare to country

## sdmx
- [ ] remove SEX dimension for configured INDICATOR values (disagreggated)
- [ ] download headers

## bugs
- [x] bug can't type in home country selector
- [x] datasource, reduce white space due to swipeable

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
- [x] swipeable avoid rendering, collapse states are reset (collapse, switch tabs, expanded!)
- [ ] collapsable download box

## map
- [ ] first request, last period then all, update component accordingly (no slider if single period)

## chart
- [ ] tooltip position
- [ ] extent always take uncertainty into account

## config
- [ ] put constants in config, remove hardcoded config in index.js
- [ ] handle locale
