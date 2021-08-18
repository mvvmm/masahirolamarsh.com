import { XIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import DeleteArchiveForm from "./DeleteArchiveForm";

export default function DeleteArchiveModal({
  session,
  closeDeleteModal,
  deleteModalOpen,
  updateArchiveData,
  deleteModalData,
}) {
  return (
    <Transition appear show={deleteModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeDeleteModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
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
            <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl border-black border-4">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 border-black border-b"
              >
                PERMANENTLY DELETE FROM ARCHIVE
              </Dialog.Title>
              <button
                type="button"
                className="absolute top-4 right-2 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-black hover:animate-spin"
                onClick={closeDeleteModal}
              >
                <XIcon className="w-5 h-5" />
              </button>
              <div className="mt-2">
                <DeleteArchiveForm
                  session={session}
                  closeDeleteModal={closeDeleteModal}
                  updateArchiveData={updateArchiveData}
                  data={deleteModalData}
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
