import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ deliveryTime }) => {
  

  const calculateRemainingTime = () => {
    const currentTime = new Date().getTime();
    const deliveryTimestamp = new Date(deliveryTime).getTime();
    return Math.max(0, Math.floor((deliveryTimestamp - currentTime) / 1000));
  };
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      if (newRemainingTime > 0) {
        setRemainingTime(newRemainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  

  const formatTime = time => (time < 10 ? `0${time}` : time);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div>
      <p>Not delivered yet. Delivery in: {formatTime(minutes)}:{formatTime(seconds)}</p>
    </div>
  );
};

export default CountdownTimer;