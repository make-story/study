# 유틸리티

https://www.typescriptlang.org/docs/handbook/utility-types.html

https://typescript-kr.github.io/pages/utility-types.html

> TypeScript는 공통 타입 변환을 용이하게 하기 위해 몇 가지 유틸리티 타입을 제공

# `Partial<T>`

T의 모든 프로퍼티를 선택적으로 만드는 타입을 구성

# `Readonly<T>`

T의 모든 프로퍼티를 읽기 전용(readonly)으로 설정한 타입을 구성

# `Record<K,T>`

타입 T의 프로퍼티의 집합 K로 타입을 구성

# `Pick<T,K>`

T에서 프로퍼티 K의 집합을 선택해 타입을 구성

# `Omit<T,K>`

T에서 모든 프로퍼티를 선택한 다음 K를 제거한 타입을 구성

# `Exclude<T,U>`

T에서 U에 할당할 수 있는 모든 속성을 제외한 타입을 구성

# `Extract<T,U>`

T에서 U에 할당 할 수 있는 모든 속성을 추출하여 타입을 구성

# `NonNullable<T>`

T에서 null 과 undefined를 제외한 타입을 구성

# `Parameters<T>`

함수 타입 T의 매개변수 타입들의 튜플 타입을 구성

# `ConstructorParameters<T>`

# `ReturnType<T>`

# `InstanceType<T>`

# `Required<T>`

# `ThisParameterType`

# `OmitThisParameter`

# `ThisType<T>`
