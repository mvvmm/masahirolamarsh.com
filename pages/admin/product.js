import Auth from "../../components/admin/Auth";
import { getSession } from "next-auth/client";
import { useState, useEffect } from "react";
import AddProductModal from "../../components/admin/products/AddProductModal";
import ProductSection from "../../components/admin/products/ProductSection";
import { getAllProductData, getProductData } from "../../lib/db";
import IconButton from "../../components/admin/IconButton";
import EditProductModal from "../../components/admin/products/EditProductModal";

export default function Product({ session }) {
  let [productData, setProductData] = useState([]);
  let [productDataIsUpdating, setProductDataIsUpdating] = useState(false);
  let [newProductModalOpen, setNewProductModalOpen] = useState(false);
  let [editProductModalOpen, setEditProductModalOpen] = useState(false);
  let [editModalData, setEditModalData] = useState({});

  useEffect(() => {
    updateProductData();
  }, []);

  function closeAddModal() {
    setNewProductModalOpen(false);
  }

  function openAddModal() {
    setNewProductModalOpen(true);
  }

  function closeEditModal() {
    setEditProductModalOpen(false);
  }

  async function openEditModal(productID) {
    const data = await getProductData(productID);
    setEditModalData(data);
    setEditProductModalOpen(true);
  }

  async function updateProductData() {
    setProductDataIsUpdating(true);
    const data = await getAllProductData();
    setProductData(data);
    setProductDataIsUpdating(false);
  }

  return (
    <Auth session={session}>
      <style jsx global>
        {`
          html,
          body {
            background: white;
            color: black;
          }
        `}
      </style>
      <EditProductModal
        session={session}
        closeModal={closeEditModal}
        editProductModalOpen={editProductModalOpen}
        updateProductData={updateProductData}
        editModalData={editModalData}
      />
      <AddProductModal
        session={session}
        closeModal={closeAddModal}
        newProductModalOpen={newProductModalOpen}
        updateProductData={updateProductData}
      />
      <div className="relative border-b mb-4">
        <h1 className="text-3xl">PRODUCT</h1>
        <div className="absolute -top-4 right-0 space-x-2">
          <IconButton
            label="REFRESH"
            icon="refresh"
            color="gray"
            action={updateProductData}
            loading={productDataIsUpdating}
          />
          <IconButton
            label="NEW"
            icon="plus"
            color="green"
            action={openAddModal}
          />
        </div>
      </div>
      <ProductSection productData={productData} openEditModal={openEditModal} />
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
