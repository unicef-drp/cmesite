# TODO

## requests/selections
- [ ] initial request in home
- [ ] initial request in map
- [ ] block requests in compare
- [ ] click on country to go on tab country with proper selection
- [ ] default compare country is the one from country
- [ ] if no country in compare, no request
- [ ] Chart is maybe re-rendered when switching tabs and when expanding Legend
- [ ] sdmx data request is too heavy when all selected
- [ ] change selection, reset mapIndex

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
- [ ] legend labels (need country in compare)
- [ ] update chart title when switching from compare to country
- [ ] tooltip labels (country, compare, SERIES_NAME, SERIES_CATEGORY, SERIES_TYPE, SERIES_YEAR and country for compare)
- [ ] legend symbol: lines for estimate et uncertainty
- [ ] legend labels (country, compare, SERIES_NAME and indicators values)
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
- [ ] put constants in config, remove hardcoded config in index.js
- [ ] contact us in about
- [ ] footer links

## unicef
- [ ] data icons/style tabs
- [ ] WP backup WP-DB-Backup (daily)
- [ ] DataNote source
- [ ] SEO aspect, post release (https://web.dev/measure?authuser=1)
- [ ] GA

---

## dimensions
- [ ] remove SEX dimension for configured INDICATOR values (disagreggated)
- [ ] collapsable download box

## chart
- [ ] different symbols regarding SERIES_METHOD

## config
- [ ] handle locale
