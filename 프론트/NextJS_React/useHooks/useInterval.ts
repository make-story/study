import { useEffect, useRef } from "react";

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

/*
const withInterval = (callback, delay) => {
  const intervalId = window.setInterval(callback, delay);
  return () => {
    window.clearInterval(intervalId);
  };
};

useEffect(() => {
  return withInterval(..., 1000);
}, deps);
*/

/*
const betterInterval = () => {
  let time = 0;
  return {
    start: () =>
      (time = window.setInterval(() => console.log(Date.now()), 100)),
    clear: () => window.clearInterval(time),
  };
};
const interval = betterInterval();
interval.start();
interval.clear();
*/

export default useInterval;
