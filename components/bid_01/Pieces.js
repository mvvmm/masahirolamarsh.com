import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import PieceModalBody from "./PieceModalBody";
import { XIcon } from "@heroicons/react/solid";
import useWindowSize from "../../hooks/useWindowSize";

export default function Pieces() {
  const pieceData = [
    {
      cover_img: "https://cdn.masahirolamarsh.com/bid_01/1/21.webp",
      imgs: [
        "https://cdn.masahirolamarsh.com/bid_01/1/21.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/17.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/20.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/1.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/12.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/13.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/14.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/15.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/16.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/2.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/3.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/6.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/7.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/8.webp",
        "https://cdn.masahirolamarsh.com/bid_01/1/9.webp",
      ],
      title: "#4 ”I did it for my soul”",
      materials: [
        "Concrete base",
        "Zinc bolts",
        "Patinaed brass",
        "Sterling silver",
        "24 karat gold burnish",
        "Three black diamonds",
      ],
      includes: [
        "Sculpture",
        "Replica jewelry piece made to buyers size",
        "Personalized note about the piece",
        "World wide shipping",
      ],
      reserve: 3000,
    },
    {
      cover_img: "https://cdn.masahirolamarsh.com/bid_01/3/13.webp",
      imgs: [
        "https://cdn.masahirolamarsh.com/bid_01/3/13.webp",
        "https://cdn.masahirolamarsh.com/bid_01/3/4.webp",
        "https://cdn.masahirolamarsh.com/bid_01/3/12.webp",
        "https://cdn.masahirolamarsh.com/bid_01/3/2.webp",
        "https://cdn.masahirolamarsh.com/bid_01/3/3.webp",
        "https://cdn.masahirolamarsh.com/bid_01/3/5.webp",
        "https://cdn.masahirolamarsh.com/bid_01/3/6.webp",
        "https://cdn.masahirolamarsh.com/bid_01/3/8.webp",
        "https://cdn.masahirolamarsh.com/bid_01/3/9.webp",
        "https://cdn.masahirolamarsh.com/bid_01/3/1.webp",
        "https://cdn.masahirolamarsh.com/bid_01/3/10.webp",
      ],
      title: "#5 ”La Caverna”",
      materials: [
        "Concrete base",
        "Zinc bolts",
        "Patinaed brass",
        "Sterling silver",
        "One black diamond",
      ],
      includes: [
        "Sculpture",
        "Replica jewelry piece made to buyers size",
        "Personalized note about the piece",
        "World wide shipping",
      ],
      reserve: 1500,
    },
    {
      cover_img: "https://cdn.masahirolamarsh.com/bid_01/2/16.webp",
      imgs: [
        "https://cdn.masahirolamarsh.com/bid_01/2/16.webp",
        "https://cdn.masahirolamarsh.com/bid_01/2/4.webp",
        "https://cdn.masahirolamarsh.com/bid_01/2/9.webp",
        "https://cdn.masahirolamarsh.com/bid_01/2/7.webp",
        "https://cdn.masahirolamarsh.com/bid_01/2/1.webp",
        "https://cdn.masahirolamarsh.com/bid_01/2/15.webp",
        "https://cdn.masahirolamarsh.com/bid_01/2/2.webp",
        "https://cdn.masahirolamarsh.com/bid_01/2/10.webp",
      ],
      title: "#6 ”Cavities”",
      materials: [
        "Concrete base",
        "Zinc bolts",
        "Patinaed brass",
        "Sterling silver",
      ],
      includes: [
        "Sculpture",
        "Replica jewelry piece made to buyers teeth",
        "Personalized note about the piece",
        "World wide shipping",
      ],
      reserve: 4000,
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
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-black shadow-xl border border-gray-500 max-w-screen-lg">
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
