import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const interval = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(interval);
  }, [delay]);
};

export default useInterval;
