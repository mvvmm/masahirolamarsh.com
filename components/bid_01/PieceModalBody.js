import { useState } from "react";
import BidInput from "./BidInput";
import useCountdown from "../../hooks/useCountdown";

export default function PieceModalBody({
  data,
  activeImageIdx,
  setActiveImageIdx,
  closeModal,
}) {
  const [hasBid, setHasBid] = useState(false);
  const [bidOpen, setBidOpen] = useState(false);
  const [bidSuccess, setBidSuccess] = useState(null);

  function bidMade(success) {
    setBidOpen(false);
    setHasBid(true);
    setBidSuccess(success);
  }

  const countdown = useCountdown({ endDate: "December 21, 2021 00:00:00" });

  return (
    <>
      <div
        className="absolute top-5 right-7 text-2xl cursor-pointer hover:text-red-500 hover:border border-red-500 p-2"
        onClick={closeModal}
      >
        X
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col mb-6 lg:mb-0">
          <div className="mb-4">
            <img
              src={data.imgs[activeImageIdx]}
              className="mx-auto lg: max-w-full"
            />
          </div>
          <div className="flex flex-row flex-wrap space-x-4 justify-center">
            {data.imgs.map((img, i) => (
              <img
                key={img}
                className={` ${
                  activeImageIdx == i && "border border-white"
                } hover:scale-105 cursor-pointer rounded-sm my-2`}
                src={img}
                width={50}
                height={50}
                onClick={() => {
                  setActiveImageIdx(i);
                }}
              />
            ))}
          </div>
        </div>
        <div className="p-4 flex flex-col justify-between lg:pl-12">
          <div className="mb-8 lg:pt-8">
            <h1 className="text-4xl mb-6 font-bold text-center">
              {data.title}
            </h1>
            <h2 className="text-xl mb-4">
              Reserve:{" "}
              <span className="text-base">
                <span className="ml-2">$</span>
                {data.reserve} USD
              </span>
            </h2>
            <h2 className="text-xl">Materials</h2>
            <ul className="mb-4">
              {data.materials.map((material) => (
                <li key={material} className="ml-6">
                  <span className="mr-2 text-gray-600">x</span> {material}
                </li>
              ))}
            </ul>
            <h2 className="text-xl">Includes</h2>
            <ul className="mb-4">
              {data.includes.map((include) => (
                <li key={include} className="ml-6">
                  <span className="mr-2 text-gray-600">x</span> {include}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {!hasBid && !bidOpen && (
              <button
                className={`${
                  countdown.expired && "opacity-50 pointer-events-none"
                } $inline-flex items-center justify-center text-center w-full bg-black border border-white font-bold py-2 px-4 rounded hover:bg-green-500`}
                onClick={() => {
                  setBidOpen(true);
                }}
              >
                {countdown.expired ? "Expired" : "Bid"}
              </button>
            )}
            {bidOpen && <BidInput data={data} bidMade={bidMade} />}
            {hasBid && bidSuccess && (
              <h2 className="text-center text-green-500">
                Bid received. Thank you.
              </h2>
            )}
            {hasBid && !bidSuccess && (
              <h2 className="text-center text-red-500">
                Something went wrong. Try again or contact
                support@masahirolamarsh.com
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
