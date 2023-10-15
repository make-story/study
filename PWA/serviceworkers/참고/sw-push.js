'use strict';

self.addEventListener('install', event => {
    self.skipWaiting();
    console.log('Changed service worker');
});

self.addEventListener('activate', event => {
    console.log('activate');
});

self.addEventListener('fetch', event => {

});

self.addEventListener('push', event => {
    try {
        const {notification, data} = event.data.json();
        let notice = null;
        if (typeof data !== 'undefined') {
            notice = data;
        } else {
            notice = JSON.parse(notification['body']);
        }

        const domain = 'https://www.joongang.co.kr';
        let utmSrc = 'utm_source=pwa&utm_medium=pwa&utm_campaign=MMMMMM&utm_content=YYMMDD&utm_term=NNNNNN';
        let campaign = '';
        if (notice.PUSH_TYPE) {
            switch (notice.PUSH_TYPE) {
                case 'SOKBO':
                    campaign = 'breakingnews';
                    break;
                case 'RECOM':
                    campaign = 'recommendation1';
                    break;
                case 'NOTICE':
                    campaign = 'notice';
                    break;
                case 'PROD':
                    campaign = 'recommendation2';
                    break;
                case 'EVENT':
                    campaign = 'event';
                    break;
            }
        }

        utmSrc = utmSrc.replace('MMMMMM', campaign)
            .replace('YYMMDD', notice.REG_DT.split(' ')[0].replaceAll('-', '').substr(2))
            .replace('NNNNNN', notice.CONTENT_SEQ);

        const title = notice.TITLE;
        const options = {
            body: notification.body,
            icon: notice.icon,
            badge: notice.BADGE_COUNT,
            image: notice.PUSH_IMG_URL,
            tag: notice.PUSH_TYPE + notice.CONTENT_SEQ,
            data: {
                linkUrl: (typeof notice.REL_URL !== 'undefined') ? notice.REL_URL + ((notice.REL_URL.indexOf('?') == -1) ? '?' : '&') + utmSrc : domain + '?'+ utmSrc,
                device: notice.DEV_DIV === 'P' ? 'pc' : 'mobile'
            },
            renotify: true,
            requireInteraction: true
        };

        console.log('푸시 메시지 노출', options);
        event.waitUntil(self.registration.showNotification(title, options));
    } catch (err) {
        console.log(err);
    }
});


self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.linkUrl));
});

