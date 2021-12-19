import useCountdown from "../../hooks/useCountdown";

export default function CountDown() {
  const countdown = useCountdown({ endDate: "December 21, 2021 00:00:00 EST" });
  return (
    <div className="flex">
      <div className="text-5xl lg:text-7xl mx-auto">
        <span className="text-sm ml-4">bid expires in:</span>
        {countdown.expired ? (
          <p>00:00:00:00</p>
        ) : (
          <h2 className="leading-none">
            {countdown.days}:{countdown.hours}:{countdown.minutes}:
            {countdown.seconds}
          </h2>
        )}
      </div>
    </div>
  );
}
