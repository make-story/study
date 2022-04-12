/**
 * https://www.digitalocean.com/community/tutorials/front-and-rear-camera-access-with-javascripts-getusermedia
 */

// 1. Checking Device Support
if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log("Let's get this party started");
}

// 2. Requesting User Permission
navigator.mediaDevices.getUserMedia({video: true});


// Using the enumerateDevices Method
async function getDevices() {
    // PC에서 사용 가능한 모든 입력 미디어 장치를 반환
    const devices = await navigator.mediaDevices.enumerateDevices();
}