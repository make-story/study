# Next.js 이미지

https://nextjs.org/docs/app/api-reference/components/image

https://nextjs.org/docs/app/building-your-application/optimizing/images

- 장치의 크기에 맞춘 적절한 이미지 사이즈와 최신 이미지 포맷 지원
- Web Vitals의 CLS 발생을 방지
- 레이지 로드를 기본적으로 사용하고 있기 때문에, 뷰포트에 노출됐을 때 이미지 로드. 선택적으로 블러링 처리한 이미지를 먼저 노출하는 기능
- 이미지 리사이징. 외부 이미지도 리사이징 가능

https://fe-developers.kakaoent.com/2022/220714-next-image/

https://oliveyoung.tech/blog/2023-06-09/nextjs-image-optimization/

next.js는 이미지 자동 최적화 기능이 구현되어 사이즈를 변경하거나 퀄리티를 수정하는 등 브라우저들이 지원하는 최신 포멧의 이미지를 제공할 수 있다.  
따라서 큰 이미지라도 작은 뷰포트에서는 작게 리사이즈되어 서빙된다. 이미지 최적화 기능은 next.js 에서 Image컴포넌트를 import하여 <img> 엘리먼트를 사용하듯이 쓸 수 있다.

```javascript
import Image from 'next/image';
<Image src='/logo.png' alt='Logo' width={500} height={500} />;
```

## 이미지 최적화 시점과 이미지 재사용

https://oliveyoung.tech/blog/2023-06-09/nextjs-image-optimization/

`이미지 최적화는 빌드 타임이 아닌 런타임에 요청이 들어왔을 때 최적화를 진행한다. 그렇기에 최초 1회 요청은 응답이 느릴 수 있다.`

NEXT.JS는 요청이 들어왔을 때, dist 폴더 밑에 cache/images 폴더에 최적화한 이미지를 동적으로 만들고,  
이후에 동일한 요청에 대해서는 이미 만들어 놓은 최적화한 이미지를 캐시로서 재사용합니다.

그리고, NEXT.JS의 서버가 동작한 뒤에 첫 요청이 들어온 경우에는 이미지를 최적화하는 로직이 있기 때문에 시간이 조금 더 오래 걸립니다.  
첫 번째 요청이 끝난 후에 다시 동일한 이미지를 요청하는 경우에는 이미 최적화되어 있는 이미지를 재사용하기 때문에 좀 더 빠르게 응답하는 모습을 볼 수 있습니다.

최적화한 이미지를 재사용했는지 여부는 NEXT.JS에서 추가로 전달하는 응답 헤더를 살펴보면 알 수 있습니다.

이미지가 캐시가 되어 있지 않았다면, X-Nextjs-Cache 헤더에 MISS를 이미지가 캐시되어 있었다면, HIT를 응답으로 전달하기 때문에 이 값을 보고 이미지의 캐시 여부에 대한 판단이 가능합니다.

동적으로 최적화를 해야 하므로 이미지 최적화가 필요 없는 SVG와 같은 vector 이미지, 그리고 GIF와 같은 상대적으로 복잡하고 최적화에 오래 걸리는 애니메이션 이미지의 경우에서는 코드 레벨에서 최적화를 진행하지 않고 바로 응답으로 내려주게 되어 있습니다.

## sharp VS Squoosh

`study.git/파일_버퍼_스트림_포맷_변환/Image/이미지_최적화_도구.md` 참고!

NEXT.JS는 운영 환경에서는 sharp 라이브러리를 사용할 것은 권장하고 있습니다.

https://nextjs.org/docs/messages/sharp-missing-in-production

sharp? Squoosh?

NEXT.JS는 Squoosh를 기본 이미지 최적화 모듈로 사용하고 있고, Squoosh는 빠르게 설치할 수 있고 개발 환경에 적합하다고 합니다.  
그런데, 운영 환경에서는 sharp를 사용하는 것을 매우 강력하게 권장하고 있습니다.

`sharp를 사용하면 Squoosh를 사용할 때와 비교하면 WebP 포맷으로 최적화할 때는 3~4배, AVIF 포맷으로 최적화할 때는 3~6배 정도의 성능 개선이 있다.`
