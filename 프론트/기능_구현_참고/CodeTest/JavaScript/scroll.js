// `study.git/프론트/JavaScript/JavaScript_크기_위치_스크롤.md` 참고!
function setScrollTarget() {
  const scrollViewport =
    document.querySelector('#scrollViewport') || document.querySelector('html');
  const target = scrollViewport.querySelector('#target');
  const rect = target.getBoundingClientRect(); // 주의!! element 위치 값은 실행되는 시점에 매번 정보를 가져와야 한다! (특정 변수에 저장했다가 재활용 주의!)
  scrollViewport.scrollTo({
    top: rect.top + scrollViewport.scrollTop,
    behavior: 'smooth',
  });
}
