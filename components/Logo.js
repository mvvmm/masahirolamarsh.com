import Link from "next/link";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { MailIcon } from "@heroicons/react/outline";

export default function Logo() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
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
                <div className="flex">
                  <div
                    className="absolute top-5 right-5 cursor-pointer hover:text-red-500 hover:border border-red-500 p-2"
                    onClick={closeModal}
                  >
                    X
                  </div>
                  <div className="flex flex-row conent-center">
                    <div>
                      <Image
                        src="/img/contact.webp"
                        width={100}
                        height={100}
                      ></Image>
                    </div>
                    <div className="flex flex-col ml-6 my-auto">
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-white"
                        >
                          Masahiro LaMarsh
                        </Dialog.Title>
                      </div>
                      <a href="mailto:contact@masahirolamarsh.com">
                        <div className="inline-flex items-center content-center text-gray-500 hover:text-amber-800">
                          <div>
                            <MailIcon className="w-5 h-5 pt-0.5" />
                          </div>
                          <div>
                            <p className="ml-2">contact@masahirolamarsh.com</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <div
        className="group fixed top-5 left-5 z-20 cursor-pointer"
        onClick={() => {
          openModal();
        }}
      >
        <a>
          <img
            className="h-16 group-hover:block hidden border border-white"
            src="/img/thumb/white.png"
          />
          <img
            className="h-16 group-hover:hidden block border border-transparent"
            src="/img/thumb/black.png"
          />
        </a>
      </div>
    </>
  );
}
