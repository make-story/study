# Nginx

https://velog.io/@jeff0720/2018-11-18-2111-%EC%9E%91%EC%84%B1%EB%90%A8-iojomvsf0n

# 엔진엑스 캐시

https://couplewith.tistory.com/m/entry/%EA%BF%80%ED%8C%81%EA%B3%A0%EC%84%B1%EB%8A%A5-Nginx%EB%A5%BC%EC%9C%84%ED%95%9C-%ED%8A%9C%EB%8B%9D5-%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%EC%BA%90%EC%8B%B1

# MAC 설치

nginx 설치 여부 확인

```
$ brew services
```

설치

```
$ brew install nginx
```

'localhost:8080' 접속

설정

```
$ nano /usr/local/etc/nginx/nginx.conf
```

# 리버스 프록시

리버스 프록시는 클라이언트 요청을 받아 실제 서버로 전달하고,  
서버의 응답을 클라이언트에게 전달하는 역할을 합니다.

이는 서버의 실제 IP 주소를 감추고 보안을 강화하는 데 도움이 됩니다.  
또한 부하 분산, 캐싱, SSL 암호화 등의 기능을 수행할 수 있어 웹 서비스의 성능 및 보안을 향상시킬 수 있습니다.

## 장점

- 로드 밸런싱
  여러 서버에 트래픽을 분산시켜 서버 부하를 줄이고 가용성을 높입니다.
- 보안 강화
  리버스 프록시는 외부 요청을 필터링하여 보안을 강화합니다.
- 캐싱
  정적 콘텐츠를 캐시하여 응답 시간을 개선하고 서버 부하를 줄입니다.

## 단점

- 추가적인 서버 설정과 관리
  리버스 프록시를 사용하려면 추가적인 서버 설정과 관리가 필요합니다.
- 네트워크 지연
  리버스 프록시를 통과하는 모든 요청에 대해 약간의 네트워크 지연이 발생할 수 있습니다.
- 복잡성 증가
  리버스 프록시가 있는 아키텍처는 일부 경우에 복잡성이 증가할 수 있습니다.

```conf
# vi /etc/nginx/nginx.conf
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

1. nginx.conf를 찾는다.

```
# find / -name nginx.conf
/etc/nginx/nginx.conf
```

2. defalut.conf를 사용해서 test_proxy.conf를 만들고 defalut.conf를 벡업하자.

```
# cp default.conf test_proxy.conf
# mv default.conf default.bak
```

3. test_proxy.conf 수정

```conf
# vi test_proxy.conf
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/log/host.access.log  main;

    location /node/ {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_set_header X-NginX-Proxy true;

      proxy_pass http://127.0.0.1:3000/;
      proxy_redirect off;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

4. nginx를 restart

```conf
# service nginx restart
```
