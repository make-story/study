/**
 * 카카오맵 참고 개발
 */

const obj = {};

// 지도로딩
const setMap = (options={}) => {
    let { longitude='126.99273830706699'/*경도*/, latitude='37.560499112778714'/*위도*/ } = options;

	//지도 출력 div
	let map_view = $('#map_view')[0];

	//기본 지도 설정
	obj.map = new daum.maps.Map(map_view, {
		center: new daum.maps.LatLng(latitude, longitude), //중심 좌표
		level: 4, //확대 수준
		draggable: true //마우스로 드래그하여 시점을 변경 가능한지의 여부
	});

	//컨트롤
	let zoomControl = new daum.maps.ZoomControl();
	obj.map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
	let mapTypeControl = new daum.maps.MapTypeControl();
	obj.map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
	/*
	//확대 수준이 변경되면 발생
	daum.maps.event.addListener(obj.map, 'zoom_changed', function() {
		
	});
	*/
	/*
	//드래그가 끝날 때 발생
	daum.maps.event.addListener(obj.map, 'dragend', function() {
		
	});
	*/
	/*
	//중심 좌표가 변경되면 발생
	daum.maps.event.addListener(obj.map, 'center_changed', function() {
		
	});
	*/
};
