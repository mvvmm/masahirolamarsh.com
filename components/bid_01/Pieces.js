import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import PieceModalBody from "./PieceModalBody";
import { XIcon } from "@heroicons/react/solid";
import useWindowSize from "../../hooks/useWindowSize";

export default function Pieces() {
  const pieceData = [
    {
      cover_img: "https://cdn.masahirolamarsh.com/bid_01/1/1.webp",
      imgs: [
        "https://cdn.masahirolamarsh.com/bid_01/1/1.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/2.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/3.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/4.webp",
      ],
      title: "Sculpture_01_suc4_a44",
      description:
        "This piece repesents the birth of my first born child. Ugly as fuck. hard to watch. I hate babies, they look so fucking ugly...",
      reserve: 200,
    },
    {
      cover_img: "https://cdn.masahirolamarsh.com/bid_01/2/1.webp",
      imgs: [
        "https://cdn.masahirolamarsh.com/bid_01/2/1.webp",
        "https://cdn.masahirolamarsh.com/bid_01/2/2.webp",
      ],
      title: "piece 2",
      description: "piece 2 description",
      reserve: 200,
    },
    {
      cover_img: "https://cdn.masahirolamarsh.com/bid_01/3/1.webp",
      imgs: [
        "https://cdn.masahirolamarsh.com/bid_01/3/1.webp",
        "https://cdn.masahirolamarsh.com/bid_01/3/2.webp",
      ],
      title: "piece 3",
      description: "piece 3 description",
      reserve: 200,
    },
  ];

  const [activeData, setActiveData] = useState(pieceData[0]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // preload images
  useEffect(() => {
    pieceData.forEach((piece) => {
      piece.imgs.forEach((img) => {
        const preload = new Image();
        preload.src = img;
        return preload;
      });
    });
  }, []);

  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-black shadow-xl border border-gray-500">
                <PieceModalBody
                  data={activeData}
                  activeImageIdx={activeImageIdx}
                  setActiveImageIdx={setActiveImageIdx}
                  closeModal={closeModal}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <div className="flex flex-col divide-y lg:flex-row lg:divide-y-0 content-center align m-8 max-w-screen-2xl mx-auto">
        {pieceData.map((piece, i) => (
          <div
            key={piece.cover_img}
            className="mx-auto p-12 group"
            width="500"
            height="500"
          >
            <img
              src={piece.cover_img}
              className="transition-transform duration-700 group-hover:scale-105 group-hover:cursor-pointer"
              onClick={() => {
                setActiveData(pieceData[i]);
                setActiveImageIdx(0);
                openModal();
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
