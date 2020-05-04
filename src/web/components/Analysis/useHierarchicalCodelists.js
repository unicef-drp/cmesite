import { useEffect, useState } from 'react';
import axios from 'axios';
import { getHierarchicalCodelists } from '../../api/sdmx';

function useHierarchicalCodelists() {
  const [isLoading, setIsLoading] = useState(false);
  const [hierarchicalCodelists, setHierarchicalCodelists] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    getHierarchicalCodelists({ source })
      .then(hierarchicalCodelists => {
        setIsLoading(false);
        if (axios.isCancel()) return;
        setHierarchicalCodelists(hierarchicalCodelists);
      })
      .catch(error => {
        setIsLoading(false);
        // eslint-disable-next-line no-console
        if (axios.isCancel(error)) console.log('Request canceled');
        console.log(error.message); // eslint-disable-line no-console
      });

    // Trigger the abortion in useEffect's cleanup function
    return () => source.cancel();
  }, []);

  return [isLoading, hierarchicalCodelists];
}

export default useHierarchicalCodelists;
