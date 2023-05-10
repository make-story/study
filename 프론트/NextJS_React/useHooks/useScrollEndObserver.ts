import { useCallback, useEffect } from 'react';

/** 화면 최하단으로 스크롤시 이벤트 트리거 */
export default function useScrollEndObserver(
  callback: () => void,
  {
    /**
     * 하단까지의 간격
     * - 예) 2000일 경우 화면의 하단이 화면의 끝에서 2000px 이내로 진입하면 이벤트 발생
     *
     * @defaultValue 0
     */
    offset = 0,
  },
) {
  const handleScroll = useCallback(() => {
    if (window.scrollY + window.innerHeight < document.body.scrollHeight - offset) return;
    callback?.();
  }, [callback, offset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
}
