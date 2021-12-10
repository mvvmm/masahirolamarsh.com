import { useEffect, useState } from "react";
import useCountdown from "../../hooks/useCountdown";

export default function CountDown() {
  const countdown = useCountdown({ endDate: "December 18, 2021 12:00:00" });
  return (
    <div className="text-7xl mx-auto w-full text-center">
      {countdown.expired ? (
        <p>00:00:00:00</p>
      ) : (
        <p>
          {countdown.days}:{countdown.hours}:{countdown.minutes}:
          {countdown.seconds}
        </p>
      )}
    </div>
  );
}
