import { useCallback, useEffect, useState } from 'react';

/**
 * viewport의 높이를 가져오는 hook
 * - body height값 100% 고정임으로 document.body.clientHeight 값 이용
 * - body style변경에 따라 다른 값으로 대체 될 수 있음
 *
 * @param {number} defaultValue 기본값(0)
 * @returns {number} Viewport Height
 */
export default function useViewportHeight(defaultValue = 0) {
  const [viewportHeight, setViewportHeight] = useState(defaultValue);

  const updateViewportHeight = useCallback(() => {
    setViewportHeight(document.body.clientHeight);
  }, []);

  useEffect(() => {
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
    };
  }, []);

  return viewportHeight;
}
