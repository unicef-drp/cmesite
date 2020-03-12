import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoadingStructure, getAnalysisIndicatorDimensionValues } from '../../selectors/data';
import { loadStructure } from '../../ducks/data';

export default type => {
  const isLoading = useSelector(getIsLoadingStructure);
  const indicatorValues = useSelector(getAnalysisIndicatorDimensionValues(type));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStructure());
  }, []);

  return [isLoading, indicatorValues];
};
