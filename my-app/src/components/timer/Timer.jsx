import React, { useState, useEffect } from 'react';
import Move from '../../assets/sounds/Move.mp3';
import Clock from '../../assets/sounds/clock.mp3';
import useSound from 'use-sound';

const Timer = ({ showModal, seconds, setSeconds }) => {
  const [play, { stop }] = useSound(Clock, { volume: 0.1 });
  const [playMove] = useSound(Move, { volume: 0.1 });
  const [isClockPlaying, setIsClockPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      if (seconds < 4 && !isClockPlaying) {
        play();
        setIsClockPlaying(true);
      } else if (seconds <= 0 && isClockPlaying && showModal) {
        playMove();
        stop();
        setIsClockPlaying(false);
      }
    }, [seconds, isClockPlaying, play, stop, playMove]);  

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <div className="time-display">{formatTime(seconds)}</div>
    </div>
  );
};

export default Timer;
