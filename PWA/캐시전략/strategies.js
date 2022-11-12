// https://www.happykoo.net/@happykoo/posts/182

// cache with network Fallback
// cache된 데이터가 있으면 cache 데이터를 제공하고, 아니면 서버로 request를 보내는 형태
self.addEventListener('fetch', event => {
    console.log("Fetching somthing!!", event.request.url);

    event.respondWith(
        caches.match(event.request)
        .then( res => {
            if(res) {
            //cache에 있다면 cache된 데이터 제공
            return res;
            } else {
            //cache에 없다면 서버로 요청
            return fetch(event.request)
                .then( r => {
                //일단 방명록 목록을 불러오는 request에 대한 response만 cache!
                if(event.request.method !== 'GET' || !event.request.url.startsWith('http://[서버아이피]:7777/posts')) 
                    return r;

                //response를 cache에 저장
                return caches.open(CACHE_DYNAMIC_NAME)
                    .then( cache => {
                    cache.put(event.request.url, r.clone())
                    return r;
                    });
                })
                .catch(err => {
                return caches.open(CACHE_STATIC_NAME)
                    .then( cache => {
                    //만약, 요청이 text/html 이라면 /offline 을 대신 response
                    if(event.request.headers.get('accept').includes('text/html')) {
                        return cache.match('/offline')
                    }
                    })
                })
            }
        }) 
    );
});


// Cache only
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
    );
});


// Network only
self.addEventListener('fetch', event => {
    event.respondWith(
      fetch(event.request)
    );
});


// Network with Cache Fallback
// 항상 서버에 request를 요청하여 최신 response를 검색하고, 실패할 경우에만 cache를 사용
self.addEventListener('fetch', event => {
    event.respondWith(
      //항상 서버로 요청 보냄
      fetch(event.request)
        .then( res => {
          //cache에 response 저장
          ﻿return caches.open(CACHE_DYNAMIC_NAME)
                   .then( cache => {
                      cache.put(event.request.url, res.clone());
                      return res;
                   })﻿
        })
        .catch( err => {
          //server로의 요청 실패 -> cache에서 찾음
          ﻿return caches.match(event.request);﻿
        })
    )
});