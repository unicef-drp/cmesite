import { useEffect, useState } from 'react';
import axios from 'axios';
import * as R from 'ramda';
import { getAnalysisData } from '../../api/sdmx';

const START_PERIOD = 1990;
const END_PERIOD = 2019;

function useSeries(indicatorValueId) {
  const [isLoading, setIsLoading] = useState(false);
  const [series, setSeries] = useState([]);

  useEffect(
    () => {
      if (R.isNil(indicatorValueId)) return;

      setIsLoading(true);
      setSeries([]);

      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      getAnalysisData({
        indicatorValueId,
        source,
        startPeriod: START_PERIOD,
        endPeriod: END_PERIOD,
      })
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
    [indicatorValueId],
  );

  return [isLoading, series];
}

export default useSeries;
