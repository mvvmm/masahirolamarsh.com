import Auth from "../../components/admin/Auth";
import { getSession } from "next-auth/client";
import { PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import AddProductModal from "../../components/admin/AddProductModal";

export default function admin({ session }) {
  let [newProductModalOpen, setNewProductModalOpen] = useState(false);

  function closeModal() {
    setNewProductModalOpen(false);
  }

  function openModal() {
    setNewProductModalOpen(true);
  }

  return (
    <Auth session={session}>
      <AddProductModal
        session={session}
        closeModal={closeModal}
        newProductModalOpen={newProductModalOpen}
      />

      <div className="relative border-b mb-4">
        <h1 className="text-3xl">PRODUCT</h1>
        <button
          onClick={openModal}
          className="absolute -top-2 right-0 bg-green-100 border border-green-900 text-green-900 py-1 px-2 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-green-200"
        >
          <PlusIcon className="w-4 h-4 mx-auto " />
          <p className="text-xs text-green-900">NEW</p>
        </button>
      </div>
    </Auth>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
