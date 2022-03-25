import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import MenuItem from "./MenuItem";
import Link from "next/link";

export default function MenuPanel({ open, setOpen }) {
  const nav = [
    { label: "about", href: "/about" },
    { label: "archive", href: "/archive" },
    { label: "collections", href: "/collections" },
  ];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 left-0 flex max-w-full pr-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-sm">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="py-6 px-4 sm:px-6">
                    <div className="flex items-center justify-end">
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mx-auto w-72 px-12">
                      <Link href="/">
                        <a className="group focus:outline-none">
                          <div className="rounded-sm ring-black ring-offset-8 group-focus:ring-1">
                            <Image
                              src="/img/logo w name below.png"
                              alt="Masahiro LaMarsh logo"
                              width={1000}
                              height={401}
                            />
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="relative flex-1 py-6 px-4 sm:px-6">
                    <nav className="absolute inset-0 py-6 px-4 sm:px-6">
                      <ul>
                        {nav.map((item) => (
                          <MenuItem key={item.label} item={item} />
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
