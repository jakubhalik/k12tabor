"use client";

import { useState, useEffect } from "react";

export default function Countdown() {
  interface styleForCountdown extends React.CSSProperties {
    "--value"?: string | number;
  }

  const calculateTimeLeft = () => {
    const difference = +new Date("2024-02-11") - +new Date();
    let timeLeft: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    } = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center pt-8">
      <h2 className="font-bold text-3xl text-center text-white mb-4 lg:mb-0 lg:text-left lg:text-3xl flex items-center lg:pr-4">
        Registrace se spustí za:
      </h2>
      <div className="grid grid-flow-col gap-1 lg:gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-white dark:bg-black rounded-box">
          <span className="countdown font-mono flex justify-center text-2xl lg:text-5xl">
            <span
              style={{ "--value": timeLeft.days } as styleForCountdown}
            ></span>
          </span>
          dní
        </div>
        <div className="flex flex-col p-2 bg-white dark:bg-black rounded-box">
          <span className="countdown font-mono flex justify-center text-2xl lg:text-5xl">
            <span
              style={{ "--value": timeLeft.hours } as styleForCountdown}
            ></span>
          </span>
          hodin
        </div>
        <div className="flex flex-col p-2 bg-white dark:bg-black rounded-box">
          <span className="countdown font-mono flex justify-center text-2xl lg:text-5xl">
            <span
              style={{ "--value": timeLeft.minutes } as styleForCountdown}
            ></span>
          </span>
          minut
        </div>
        <div className="flex flex-col p-2 bg-white dark:bg-black rounded-box">
          <span className="countdown font-mono flex justify-center text-2xl lg:text-5xl">
            <span
              style={{ "--value": timeLeft.seconds } as styleForCountdown}
            ></span>
          </span>
          sekund
        </div>
      </div>
    </div>
  );
}
