# Node.js는 CommonJs 모듈 시스템을 표준 시스템으로 사용하고 있다.

```javascript
//CommonJs
const gulp = require('gulp');
const babel = require('gulp-babel');

//ESModule
import gulp from 'gulp';
import babel from 'gulp-babel';
```

Node.js 에서 ES모듈 시스템을 활용하려면 Babel이라는 별도의 도구가 필요했는데,
Node.js 13.2 버전(2019-11-21) 부터 손쉽게 ES모듈을 활용할 수 있게 되었다.

package.json 파일에 type 항목을 module로 설정하면 바로 활용 가능하다.

```json
{
  //...
  "type": "module"
  //...
}
```
