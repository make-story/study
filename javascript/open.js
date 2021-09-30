// 페이지 형태에 따른 실행
const setPageCallback = function(url='') {
	try {
		const opener = window.opener.document;
		if(opener) { //팝업으로 접속했을 때
			window.close();
		}
	}catch(e) { //현재창으로 접속했을 때
		//history.back();
		//window.location.replace(url);
		location.reload();
	}
};

// 윈도우 팝업
const setWinPopup = function(url='', name='popup', { width=400, height=600, features='' }={}) {
	/*
	//features
	- menubar : 메뉴바를 보여주거나 숨긴다. (옵션 : yes/no, 1/0)
	- toolbar : 도구막대를 보여주거나 숨긴다. (옵션 : yes/no, 1/0) 
	- directories : 디렉토리바를 보여주거나 숨긴다. (옵션 : yes/no, 1/0)
	- scrollbars : 스크롤바를 보여주거나 숨긴다. (옵션 : yes/no, 1/0)
	- status : 상태표시줄을 보여주거나 숨긴다. (옵션 : yes/no, 1/0)
	- location : 주소표시줄을 보여주거나 숨긴다. (옵션 : yes/no, 1/0)
	- width : 팝업 윈도우의 가로크기를 지정한다. (옵션 : 픽셀) 
	- height : 팝업 윈도우의 높이를 지정한다. (옵션 : 픽셀)
	- left : 팝업 윈도우의 x축 위치를 지정한다. (옵션 : 픽셀)
	- top : 팝업 윈도우의 y축 위치를 지정한다. (옵션 : 픽셀)
	- resizable : 팝업윈도우의 크기를 사용자가 임의로 수정할 수 있는지 여부를 지정한다. (옵션 : yes/no, 1/0)
	- fullscreen : 전체화면 모드로 열어준다.
	- channelmode : 채널모드 창으로 열어준다.
	 */
	let open;
	if(typeof features == 'undefined') {
		open = window.open(url, name, `width=${width},height=${height},menubar=no,status=no,location=no`);
	}else {	
		open = window.open(url, name, `width=${width},height=${height},${features}`);
	}
	if(open != null) {
		open.focus();
	}
};