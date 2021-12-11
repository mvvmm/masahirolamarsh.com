import { useState, useEffect } from "react";

// Hook
export default function useCountdown({ endDate }) {
  function getDays(distance) {
    return Math.floor(distance / (1000 * 60 * 60 * 24)).toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );
  }

  function getHours(distance) {
    return Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }

  function getMinutes(distance) {
    return Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    ).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }

  function getSeconds(distance) {
    return Math.floor((distance % (1000 * 60)) / 1000).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }

  function isExpired(distance) {
    return distance < 0;
  }

  function getNewCountdown(Days, Hours, Minutes, Seconds, Expired) {
    setCountdown({
      days: Days,
      hours: Hours,
      minutes: Minutes,
      seconds: Seconds,
      expired: Expired,
    });
  }

  const end = new Date(endDate).getTime();
  let now = new Date().getTime();
  let distance = end - now;

  const [countdown, setCountdown] = useState({
    days: getDays(distance),
    hours: getHours(distance),
    minutes: getMinutes(distance),
    seconds: getSeconds(distance),
    expired: isExpired(distance),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      now = new Date().getTime();
      distance = end - now;

      getNewCountdown(
        getDays(distance),
        getHours(distance),
        getMinutes(distance),
        getSeconds(distance),
        false
      );

      if (isExpired(distance)) {
        clearInterval(interval);
        getNewCountdown(
          countdown.days,
          countdown.hours,
          countdown.minutes,
          countdown.seconds,
          true
        );
      }
    }, 1000);
  }, []);

  return countdown;
}
