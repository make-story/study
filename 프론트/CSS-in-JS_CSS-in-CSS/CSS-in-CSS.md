# CSS-in-CSS

https://www.samsungsds.com/kr/insights/web_component.html

## CSS 모듈(Module)

CSS 모듈은 CSS를 모듈화 하여 사용하는 방식입니다.  
CSS 클래스를 만들면 자동으로 고유한 클래스네임을 만들어서 scope를 지역적으로 제한합니다.  
모듈화된 CSS를 번들러로 불러오면 다음과 같이 사용자가 정의했던 클래스네임과 고유한 클래스네임으로 이뤄진 객체가 반환됩니다.

https://www.javascriptstuff.com/what-are-css-modules/

CSS 모듈은 동일 프로젝트 소스 안에 CSS 클래스 이름이 중복되어도 새로운 이름이 입혀져 중복 및 관리의 위험성이 적고 CSS 네이밍 규칙이 간소화 됩니다.  
다만 한 곳에서 모든 것을 작성하지 않기 때문에 별도로 많은 CSS 파일을 만들어 관리해야 하는 단점이 있습니다.

```javascript
import styles from "../styles/Home.module.css";

export default function Home() {
  return <div className={styles.homepage}></div>;
}
```

```javascript
import styles from "../styles/Home.module.scss";

export default function Home() {
  return <div className={styles.homepage}></div>;
}
```

## CSS 전처리기(Preprocessor)

자신만의 특별한 구문(Syntax)을 가지고 CSS를 생성하는 프로그램입니다.  
CSS의 문제점을 프로그래밍 방식, 즉 변수·함수·상속 등 일반적인 프로그래밍 개념을 사용하여 보완합니다.  
CSS 전처리기에는 다양한 모듈이 존재하는데 그 중에서도 Sass·Less·Stylus가 가장 많이 사용됩니다.

CSS 전처리기는 공통 요소 또는 반복적인 항목을 변수 또는 함수로 대체할 수 있는 재사용성, 임의 함수 및 내장 함수로 인해 개발 시간과 비용 절약, 중첩·상속과 같은 요소로 인해 구조화된 코드 유지 및 관리 용이 등의 장점이 있습니다.  
반면 전처리기를 위한 도구가 필요하고 다시 컴파일하는데 시간이 소요된다는 단점도 존재합니다.
