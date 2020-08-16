import { useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initUrl, initData) => {
  const [url, setUrl] = useState(initUrl);
  const [data, setData] = useState(initData);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(false);
    setError(false);

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        if (!(res.status === 200 && res.data.code === 200))
          throw new Error('somthing error');
        setData(res.data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [{ data, isError, isLoading }, setUrl];
};

export default useDataApi;
