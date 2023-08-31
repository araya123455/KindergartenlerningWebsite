import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        console.log("Tick!"); // Add this line
        savedCallback.current();
      }
      if (delay !== null) {
        const intervalId = setInterval(tick, delay);
        return () => {
          console.log("Interval Cleared!"); // Add this line
          clearInterval(intervalId);
        };
      }
    }, [delay]);
  }
  

export default useInterval;
