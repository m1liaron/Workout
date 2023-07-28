import React, { useState, useEffect } from "react";

const container = {
  width: '100%',
  background: '#0d6efd',
  color: '#FFFFFF',
  padding: '10px',
  marginBottom: '10px',
  fontSize: '2rem'
}

const Stopwatch = ({ start, elapsedTime, setElapsedTime }) => {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (start) {
      setIsRunning(true);
      const startTime = Date.now() - elapsedTime;
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(interval);
      setIsRunning(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [start, elapsedTime]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={container}>
        <span>{formatTime(elapsedTime)}</span>
    </div>
  );
};

export default Stopwatch;