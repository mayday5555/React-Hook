import React, { useState, useEffect, Fragment } from 'react';
import useDataApi from './fetchData';
import '../css/App.css';

function App() {
  const url = 'https://api.apiopen.top/getJoke';
  const [count, setCount] = useState(5);
  const [page, setPage] = useState(1);
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    `${url}?page=${page}&count=${count}&type=video`,
    {}
  );

  useEffect(() => {
    doFetch(`${url}?page=${page}&count=${count}&type=video`);
  }, [count, page]); // 添加 [count] 参数以保证effect只在count变化时更新

  return (
    <div className="App">
      {isError ? (
        <div>is Error</div>
      ) : isLoading ? (
        <div>is Loading</div>
      ) : (
        <ul>
          {data.result
            ? data.result.map(({ sid, name, text }) => (
                <li key={sid}>
                  <div className="name">{name}</div>
                  <p className="content">{text}</p>
                </li>
              ))
            : ''}
        </ul>
      )}
      <button onClick={() => setCount(count + 1)}>add count</button>
      <button onClick={() => setPage(page + 1)}>next page</button>
      <button onClick={() => setPage(page - 1)}>prev page</button>
      <div>currentPage: {page}</div>
      <div>currentCount: {count}</div>
    </div>
  );
}

export default App;
