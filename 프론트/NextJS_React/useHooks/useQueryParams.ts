import * as Origin from 'use-query-params';
export * from 'use-query-params';

import _pick from 'lodash/pick';

export const ArrayParam = Origin.withDefault(Origin.ArrayParam, undefined, true);
export const BooleanParam = Origin.withDefault(Origin.BooleanParam, undefined, true);
export const NumberParam = Origin.withDefault(Origin.NumberParam, undefined, true);
export const StringParam = Origin.withDefault(Origin.StringParam, undefined, true);

export const PipeArrayParam = Origin.withDefault(
  <Origin.QueryParamConfig<string[] | undefined, string[] | undefined>>{
    encode: array => Origin.encodeDelimitedArray(array, '|'),
    decode: arrayStr => Origin.decodeDelimitedArray(arrayStr, '|'),
  },
  undefined,
  true,
);

export const PipeNumericArrayParam = Origin.withDefault(
  <Origin.QueryParamConfig<number[] | undefined, number[] | null | undefined>>{
    encode: array => Origin.encodeDelimitedNumericArray(array, '|'),
    decode: arrayStr => Origin.decodeDelimitedNumericArray(arrayStr, '|'),
  },
  undefined,
  true,
);

export const decodeQueryParams: typeof Origin.decodeQueryParams = (paramConfigMap, encodedQuery) => {
  return Origin.decodeQueryParams(paramConfigMap, _pick(encodedQuery, Object.keys(paramConfigMap)) as any);
};
