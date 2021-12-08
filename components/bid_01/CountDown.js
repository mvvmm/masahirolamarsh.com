import { useEffect, useState } from "react";

export default function CountDown({ endDate }) {
  const end = new Date(endDate).getTime();
  let now = new Date().getTime();
  let distance = end - now;

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

  const [days, setDays] = useState(getDays(distance));
  const [hours, setHours] = useState(getHours(distance));
  const [minutes, setMinutes] = useState(getMinutes(distance));
  const [seconds, setSeconds] = useState(getSeconds(distance));
  const [expired, setExpired] = useState(isExpired(distance));

  useEffect(() => {
    const interval = setInterval(() => {
      now = new Date().getTime();
      distance = end - now;

      if (isExpired(distance)) {
        clearInterval(interval);
        setExpired(true);
      }

      setDays(getDays(distance));
      setHours(getHours(distance));
      setMinutes(getMinutes(distance));
      setSeconds(getSeconds(distance));
    }, 1000);
  });
  return (
    <div className="text-7xl mx-auto w-full text-center">
      {expired ? (
        <p>00:00:00:00</p>
      ) : (
        <p>
          {days}:{hours}:{minutes}:{seconds}
        </p>
      )}
    </div>
  );
}
