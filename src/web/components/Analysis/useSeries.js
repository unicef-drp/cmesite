import { useEffect, useState } from 'react';
import axios from 'axios';
import * as R from 'ramda';
import { getAnalysisData } from '../../api/sdmx';
import { END_PERIODS, DEFAULT_END_PERIOD } from '../../constants';

function useSeries(indicatorValueId, isActive, isLatest, setSeriesIndex) {
  const endPeriod = R.propOr(DEFAULT_END_PERIOD, indicatorValueId, END_PERIODS);
  const startPeriod = isLatest ? endPeriod : 1990;
  const [isLoading, setIsLoading] = useState(false);
  const [series, setSeries] = useState([]);

  useEffect(
    () => {
      if (R.isNil(indicatorValueId)) return;
      if (R.not(isActive)) return;

      setSeriesIndex(0);
      setIsLoading(true);
      setSeries([]);

      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      getAnalysisData({ indicatorValueId, source, startPeriod, endPeriod })
        .then(({ series }) => {
          setIsLoading(false);
          if (axios.isCancel()) return;
          R.pipe(R.values, R.sortBy(R.prop('name')), setSeries)(series);
        })
        .catch(error => {
          setIsLoading(false);
          // eslint-disable-next-line no-console
          if (axios.isCancel(error)) console.log('Request canceled');
          console.log(error.message); // eslint-disable-line no-console
        });

      // Trigger the abortion in useEffect's cleanup function
      return () => source.cancel();
    },
    [indicatorValueId, isActive],
  );

  return [isLoading, series];
}

export default useSeries;
