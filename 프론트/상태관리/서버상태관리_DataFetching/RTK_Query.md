# RTK Query

https://redux-toolkit.js.org/rtk-query/overview

RTK 쿼리는 강력한 데이터 가져오기 및 캐싱 도구

RTK 쿼리는 Redux Toolkit 패키지에 포함된 선택적 애드온이며  
해당 기능은 Redux Toolkit의 다른 API 위에 구축되었습니다.

> 애드온이란? `프로그램의 기능을 보완하기 위해 추가하는 보조 프로그램`

```tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pokemon } from './types';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: name => `pokemon/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;
```
