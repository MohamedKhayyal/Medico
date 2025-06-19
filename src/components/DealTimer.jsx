import { useEffect, useState } from "react";

function getCountdown(targetDate) {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function DealTimer({ timerEnd }) {
  const [timer, setTimer] = useState(getCountdown(new Date(timerEnd)));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getCountdown(new Date(timerEnd)));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerEnd]);

  return (
    <div className="flex gap-2 justify-center items-center bg-gray-100 rounded p-2 mb-2">
      <div className="text-center">
        <span className="font-bold text-lg">{timer.days || 0}</span>
        <div className="text-xs">Days</div>
      </div>
      <span>:</span>
      <div className="text-center">
        <span className="font-bold text-lg">{timer.hours || 0}</span>
        <div className="text-xs">Hrs</div>
      </div>
      <span>:</span>
      <div className="text-center">
        <span className="font-bold text-lg">{timer.minutes || 0}</span>
        <div className="text-xs">Min</div>
      </div>
      <span>:</span>
      <div className="text-center">
        <span className="font-bold text-lg">{timer.seconds || 0}</span>
        <div className="text-xs">Sec</div>
      </div>
    </div>
  );
}
