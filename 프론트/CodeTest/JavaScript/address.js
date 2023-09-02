/**
 * https://developers.kakao.com/docs/latest/ko/local/dev-guide#coord-to-address
 */

// 주소 -> 좌표변환
const getAddr2coord = (address, callback) => {
	// 주소-좌표 변환 객체를 생성합니다
    // https://apis.map.kakao.com/web/documentation/#services_Geocoder
	const geocoder = new daum.maps.services.Geocoder();

	// 주소로 좌표를 검색합니다
	geocoder.addressSearch(address, (result, status) => {
		// 정상적으로 검색이 완료됐으면 
		if (status === daum.maps.services.Status.OK) {
			if(typeof callback == 'function') {
				callback(result);
			}
		} 
	});    

    /*
    $.ajax({
        url : '//apis.daum.net/local/geo/addr2coord',
        async: false, //비동기 여부
        type : 'get',
        data : {"apikey": "0a141d8dd522330f6d33f95bcde476c4677ef750", "q": address, "output": "json"},
        beforeSend: function() {
            //요청전
        },
        complete: function() {
            //요청완료
        },
        error: function() {
            //요청실패
            if(typeof callback == 'function') {
                callback();
            }
        },
        dataType: "jsonp",
        jsonp : "callback",
        success: function(json) {
            if(!json) return;
            //console.dir(json);
            if(typeof callback == 'function') {
                callback(json);
            }
        }
    });
    */
};

//좌표 -> 주소변환
const getCoord2addr = (longitude, latitude, callback) => {
	// 주소-좌표 변환 객체를 생성합니다
	const geocoder = new daum.maps.services.Geocoder();
	geocoder.coord2RegionCode(longitude, latitude, (result, status) => {
		// 정상적으로 검색이 완료됐으면 
		if (status === daum.maps.services.Status.OK) {
			if(typeof callback == 'function') {
				callback(result);
			}
		} 
	});    
};
