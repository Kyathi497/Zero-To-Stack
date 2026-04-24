"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
  const totalSec = Math.floor(diff / 1000);
  return {
    days:    Math.floor(totalSec / 86400),
    hours:   Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  };
}

interface CountdownTimerProps {
  targetDate: string;
  waitingCount?: number;
}

export default function CountdownTimer({ targetDate, waitingCount = 38 }: CountdownTimerProps) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const units: Array<{ val: number; label: string }> = [
    { val: time.days,    label: "Days"  },
    { val: time.hours,   label: "Hours" },
    { val: time.minutes, label: "Mins"  },
    { val: time.seconds, label: "Secs"  },
  ];

  return (
    <div className="db-countdown-card">
      <div className="db-countdown-label">Starting in</div>
      <div className="db-countdown">
        {units.map(({ val, label }) => (
          <div key={label} className="db-countdown-block">
            <span className="db-countdown-num">{pad(val)}</span>
            <span className="db-countdown-unit">{label}</span>
          </div>
        ))}
      </div>
      <div className="db-cd-ping">
        <span className="db-live-dot" style={{ width: 6, height: 6 }} />
        {waitingCount} classmates joined the waiting room
      </div>
    </div>
  );
}
