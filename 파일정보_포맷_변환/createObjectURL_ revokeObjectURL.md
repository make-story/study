# createObjectURL

https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static

Blob 또는 File 객체를 메모리에서 URL로 변환해주는 역할

```javascript
// 서버에서 받아온 엑셀 데이터를 화면에서 다운로드
try {
  setExcelLoaded(false);
  const response = await getUserActionLogsExcel({ monthKey: year + month });

  // 객체에 대한 임시 URL 생성
  const url = window.URL.createObjectURL(
    new Blob([response.data], { type: response.headers['content-type'] }),
  );

  // 생성한 URL을 가지고 화면에서 작업 처리
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();

  // URL을 메모리에서 제거
  window.URL.revokeObjectURL(url);
} catch (error) {
  console.log('error', error);
  alert(convertErrorMessage(error));
} finally {
  setExcelLoaded(true);
}
```

## 다운로드 링크 생성

```javascript
// 다운로드할 데이터를 Blob으로 만들기 (텍스트 파일 예제)
const data = 'Hello, World!';
const blob = new Blob([data], { type: 'text/plain' });

// Blob을 URL로 변환
const downloadUrl = URL.createObjectURL(blob);

// 다운로드 링크 생성
const downloadLink = document.createElement('a');
downloadLink.href = downloadUrl;
downloadLink.download = 'example.txt';
downloadLink.textContent = 'Download Text File';

// 웹 페이지에 다운로드 링크 추가
document.body.appendChild(downloadLink);
```

## 이미지 미리보기

```javascript
// 이미지 파일 가져오기
const imageFile = document.querySelector('#image-file').files[0];

// Blob으로 이미지 파일 생성
const blob = new Blob([imageFile], { type: 'image/jpeg' });

// Blob을 URL로 변환
const imageUrl = URL.createObjectURL(blob);

// 이미지를 표시할 img 엘리먼트 생성
const img = document.createElement('img');
img.src = imageUrl;

// 웹 페이지에 이미지 추가
document.body.appendChild(img);
```

## 객체 URL을 사용하여 이미지 표시하기

https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#example_using_object_urls_to_display_images

객체 URL을 사용하여 이미지 섬네일을 표시합니다. 부가적으로, 파일의 이름과 크기를 포함한 다른 정보도 표시

```html
<input
  type="file"
  id="fileElem"
  multiple
  accept="image/*"
  style="display:none"
  onchange="handleFiles(this.files)"
/>
<a href="#" id="fileSelect">Select some files</a>
<div id="fileList">
  <p>No files selected!</p>
</div>
```

```javascript
window.URL = window.URL || window.webkitURL;

const fileSelect = document.getElementById('fileSelect'),
  fileElem = document.getElementById('fileElem'),
  fileList = document.getElementById('fileList');

fileSelect.addEventListener(
  'click',
  function (e) {
    if (fileElem) {
      fileElem.click();
    }
    e.preventDefault(); // "#" 해시로 이동을 방지
  },
  false,
);

function handleFiles(files) {
  if (!files.length) {
    fileList.innerHTML = '<p>No files selected!</p>';
  } else {
    fileList.innerHTML = '';
    const list = document.createElement('ul');
    fileList.appendChild(list);
    for (let i = 0; i < files.length; i++) {
      const li = document.createElement('li');
      list.appendChild(li);

      const img = document.createElement('img');
      img.src = window.URL.createObjectURL(files[i]);
      img.height = 60;
      img.onload = function () {
        window.URL.revokeObjectURL(this.src);
      };
      li.appendChild(img);
      const info = document.createElement('span');
      info.innerHTML = files[i].name + ': ' + files[i].size + ' bytes';
      li.appendChild(info);
    }
  }
}
```

# revokeObjectURL

https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL_static
