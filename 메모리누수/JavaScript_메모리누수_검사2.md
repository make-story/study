# 서버사이드 메모리 누수 (Node.js, SSR, Next.js)

https://flyingsquirrel.medium.com/ssr-memory-leak-%EB%94%94%EB%B2%84%EA%B9%85%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-ce3cf41c107c

https://mingrammer.com/debug-memory-leak-with-node-heapdump/

---

## Next.js 디버깅

```
// 일반적인 경우 package.json
"script" : {
  "build": "next build",
  "start": "cross-env NODE_OPTIONS='--inspect' next dev",
}
```

Next.js 인 경우에는 cross-env 를 이용해서 NODE_OPTIONS 옵션을 설정해줄 수 있습니다.  
https://nextjs.org/docs/pages/building-your-application/configuring/debugging#debugging-on-windows

## 메모리 누수 확인 순서

1. DevTools 에서 메모리 (Memory) 탭에는 프로파일링 타입을 선택
2. 타임라인의 할당 계층 (Allocation instrumentation on timeline) 으로 디버깅
3. Recording 버튼 클릭 웹 페이지 이것저것 클릭해보며 기록
4. snapshot 결과 확인
5. Shallow Size, Retained Size 를 잘 비교해보면서 하나씩 차분히 살펴봐야합니다.

얕은 크기 (Shallow Size)
JS object 자기 자신의 크기입니다.
`객체 자체가 보유한 메모리 크기입니다.`

유지된 크기 (Retained Size)
참조하고 있는 다른 오브젝트가 있다면 그 오브젝트 크기까지 합친게 Retained Size 가 됩니다.  
다른 오브젝트가 또 참조하는 또 다른 오브젝트가 있다면 그 오브젝트의 크기도 합산됩니다. (자신+참조하고 있는 다른 오브젝트들)  
모든 메모리 크기의 단위는 바이트 (Byte)
`객체 자체가 삭제되고, 그와 함께 GC roots에서 연결할 수 없게 된 종속 객체도 모두 삭제되면 확보되는 메모리 크기입니다.`

6. `메모리 누수의 원인을 찾을 때는 Shallow Size 는 작은데, Retained Size 가 엄청 큰 것부터 살펴보는 것이 효율적`
7. shallow size 에 비해서 retained size 가 큰 요소를 클릭하면 `하단에 Object 확인 가능`
8. 의심되는 경로를 발견했다면, 코드를 다시 살펴서 메모리 누수가 일어날 만한 가설을 세우고 -> 코드를 수정하고 -> 다시 프로파일링해서 메모리 누수의 원인이 맞는지 검증하는 지루한 반복

## 크롬 개발자 도구 메모리 탭 참고

- 힙 스냅샷 (Heap snapshot)
  현재 상태의 힙메모리를 기록할 때 씁니다. 누수의 원인을 찾을 때보단 퍼포먼스 개선했을 때 before/after 측정할 때 유용할 수 있습니다.
- 타임라인의 할당 계층 (Allocation instrumentation on timeline)
  시간별로 JS 메모리할당이 얼마나 이뤄졌는지를 볼 수 있습니다.
- 할당 샘플링 (Allocation sampling)
  timeline 타입보다 훨씬 긴 시간을 프로파일링할 때 사용합니다. 긴 시간 동안 모든 오브젝트를 기록하는 것은 아니고 일부만 샘플링해서 힙메모리 사용을 기록합니다.
