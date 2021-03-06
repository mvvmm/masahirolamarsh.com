import { useState } from "react";
import {
  DotFillIcon,
  DotIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@primer/octicons-react";
import CarouselImg from "./CarouselImg";

export default function Carousel({ archiveID, imgs }) {
  const basePath = "https://cdn.masahirolamarsh.com/archive";

  const [imgIdx, setImgIdx] = useState(0);

  function nextImg() {
    if (imgIdx === imgs.length - 1) setImgIdx(0);
    else setImgIdx(imgIdx + 1);
  }

  function prevImg() {
    if (imgIdx === 0) setImgIdx(imgs.length - 1);
    else setImgIdx(imgIdx - 1);
  }

  return (
    <div className="relative w-full h-80 bg-black group">
      <div className="absolute w-full flex justify-between top-1/2 px-2 invisible group-hover:visible z-20">
        <button
          onClick={() => {
            prevImg();
          }}
          className="cursor-pointer"
        >
          <ChevronLeftIcon
            className="bg-black text-white h-8 w-8 "
            verticalAlign="middle"
          />
        </button>
        <button
          onClick={() => {
            nextImg();
          }}
          className="cursor-pointer"
        >
          <ChevronRightIcon
            className="bg-black text-white h-8 w-8"
            verticalAlign="middle"
          />
        </button>
      </div>

      <CarouselImg
        src={`${basePath}/${archiveID}/${imgs[imgIdx]}`}
        alt={imgs[imgIdx]}
      />

      <div className="absolute bottom-10 w-full invisible group-hover:visible">
        <div className="w-max mx-auto space-x-2 bg-black">
          {imgs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setImgIdx(idx);
              }}
            >
              {idx === imgIdx ? (
                <DotFillIcon
                  className="text-white h-6 w-6"
                  verticalAlign="middle"
                />
              ) : (
                <DotIcon
                  className="text-white h-6 w-6"
                  verticalAlign="middle"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
