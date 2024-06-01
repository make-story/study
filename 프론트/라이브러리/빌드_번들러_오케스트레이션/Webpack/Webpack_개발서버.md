# webpack-dev-server

https://webpack.kr/guides/development/#using-webpack-dev-server

## webpack-dev-server 는 컴파일 후 출력 파일을 작성하지 않습니다.

대신 번들 파일을 메모리에 보관하고 서버의 루트 경로에 마운트 된 실제 파일인 것처럼 제공합니다.
페이지가 다른 경로에서 번들 파일을 찾을 것으로 예상하는 경우 개발 서버 설정에서 devMiddleware.publicPath 옵션을 사용하여 변경할 수 있습니다.
