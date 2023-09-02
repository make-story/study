import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import useQueryDocument from '../../hooks/useQueryDocument';

const Test = ({ keyword }) => {
  const refInput = useRef();
  const [brand, setBrand] = useState({});
  const [categories, setCategories] = useState({});
  const [filters, setFilters] = useState({});
  const [onlineProducts, setOnlineProducts] = useState({});

  const {status, data, error, isFetching, isPreviousData} = useQueryDocument();

  console.log('data!!!', data);
  console.log('axios!!!', axios);

  /*const queryResponse = useQuery(['repoData', keyword], async () => {
    const { data } = await axios({
      method: 'get',
      url: '//localhost:4000/test/api/products',
      params: {
        keyword: keyword,
      },
    });
    console.log('data', data);
    setBrand(data.brand);
    setCategories(data.categories);
    setFilters(data.filters);
    setOnlineProducts(data.onlineProducts);
  });
  console.log('queryResponse', queryResponse);*/

  return (
    <>
      <div>
        <p>필터</p>
        {/* 필터리스트는 API 응답값의 리스트 순서가 아닌, 수동으로 정한 순위로 출력 */}
        <button></button>
      </div>
      <div>{JSON.stringify(brand)}</div>
      <div>{JSON.stringify(categories)}</div>
      <div>{JSON.stringify(filters)}</div>
      <div>{JSON.stringify(onlineProducts)}</div>
    </>
  );
};

export default Test;
