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
      title: "piece 1",
      description: "piece 1 description",
    },
    {
      cover_img: "https://cdn.masahirolamarsh.com/bid_01/2/1.webp",
      imgs: [
        "https://cdn.masahirolamarsh.com/bid_01/2/1.webp",
        "https://cdn.masahirolamarsh.com/bid_01/2/2.webp",
      ],
      title: "piece 2",
      description: "piece 2 description",
    },
    {
      cover_img: "https://cdn.masahirolamarsh.com/bid_01/3/1.webp",
      imgs: [
        "https://cdn.masahirolamarsh.com/bid_01/3/1.webp",
        "https://cdn.masahirolamarsh.com/bid_01/3/2.webp",
      ],
      title: "piece 3",
      description: "piece 3 description",
    },
  ];

  const [activeData, setActiveData] = useState(pieceData[0]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const windowSize = useWindowSize();

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
      <Transition show={windowSize.width >= 1024 && isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto hidden lg:block"
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
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-black shadow-xl rounded-2xl border border-gray-900">
                <PieceModalBody
                  data={activeData}
                  activeImageIdx={activeImageIdx}
                  setActiveImageIdx={setActiveImageIdx}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition
        show={windowSize.width < 1024 && isOpen}
        className="lg:hidden"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
        </Transition.Child>
        <Transition.Child
          enter="transition-all duration-700"
          enterFrom="-bottom-full"
          enterTo="bottom-0"
          entered="bottom-0"
          leave="transition-all duration-700"
          leaveFrom="bottom-0"
          leaveTo="-bottom-full"
          className="bg-black border-t-2 rounded-t-3xl border-gray-900 fixed w-full h-5/6 z-50 bottom-0 p-8 overscroll-auto"
        >
          <>
            <div
              className="absolute top-5 right-5 w-6 group cursor-pointer"
              onClick={closeModal}
            >
              <XIcon className="text-gray-500 group-hover:text-white group-focus:text-white group-active:text-white" />
            </div>
            <PieceModalBody
              data={activeData}
              activeImageIdx={activeImageIdx}
              setActiveImageIdx={setActiveImageIdx}
            />
          </>
        </Transition.Child>
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
                openModal();
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
