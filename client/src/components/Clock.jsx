import React, { useState, useEffect } from 'react';
import { ClockIcon } from 'lucide-react';

function Clock({ initialTime , handleSubmit}) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);  
  }, [initialTime])

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        }
        clearInterval(interval);
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex items-center">
      <ClockIcon className="mr-2 text-purple-600" />
      <span className="text-lg font-semibold">{formatTime(timeLeft)}</span>
    </div>
  );
}

export default Clock;

