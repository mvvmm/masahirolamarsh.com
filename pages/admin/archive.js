import Auth from "../../components/admin/Auth";
import { getSession } from "next-auth/client";
import { useState, useEffect } from "react";
import AddArchiveModal from "../../components/admin/archive/AddArchiveModal";
import ArchiveSection from "../../components/admin/archive/ArchiveSection";
import { getAllArchiveData } from "../../lib/db";
import IconButton from "../../components/admin/IconButton";
import EditArchiveModal from "../../components/admin/archive/EditArchiveModal";
import DeleteArchiveModal from "../../components/admin/archive/DeleteArchiveModal";

export default function Archive({ session }) {
  let [archiveData, setArchiveData] = useState([]);
  let [archiveDataIsUpdating, setArchiveDataIsUpdating] = useState(false);
  let [newArchiveModalOpen, setNewArchiveModalOpen] = useState(false);
  let [editModalOpen, setEditModalOpen] = useState(false);
  let [editModalData, setEditModalData] = useState({});
  let [deleteModalOpen, setDeleteModalOpen] = useState(false);
  let [deleteModalData, setDeleteModalData] = useState({});

  useEffect(() => {
    updateArchiveData();
  }, []);

  function closeAddModal() {
    setNewArchiveModalOpen(false);
  }

  function openAddModal() {
    setNewArchiveModalOpen(true);
  }

  function closeEditModal() {
    setEditModalOpen(false);
  }

  async function openEditModal(data) {
    setEditModalData(data);
    setEditModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
  }

  async function openDeleteModal(data) {
    setDeleteModalData(data);
    setDeleteModalOpen(true);
  }

  async function updateArchiveData() {
    setArchiveDataIsUpdating(true);
    const archive = await getAllArchiveData();
    setArchiveData(archive);
    setArchiveDataIsUpdating(false);
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
      <DeleteArchiveModal
        session={session}
        closeDeleteModal={closeDeleteModal}
        deleteModalOpen={deleteModalOpen}
        updateArchiveData={updateArchiveData}
        deleteModalData={deleteModalData}
      />
      <EditArchiveModal
        session={session}
        closeModal={closeEditModal}
        editModalOpen={editModalOpen}
        updateArchiveData={updateArchiveData}
        editModalData={editModalData}
      />
      <AddArchiveModal
        session={session}
        closeModal={closeAddModal}
        newArchiveModalOpen={newArchiveModalOpen}
        updateArchiveData={updateArchiveData}
      />
      <div className="relative border-b mb-4">
        <h1 className="text-3xl">Archive</h1>
        <div className="absolute -top-4 right-0 space-x-2">
          <IconButton
            label="REFRESH"
            icon="refresh"
            color="gray"
            action={updateArchiveData}
            loading={archiveDataIsUpdating}
          />
          <IconButton
            label="NEW"
            icon="plus"
            color="green"
            action={openAddModal}
          />
        </div>
      </div>
      <ArchiveSection
        archiveData={archiveData}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
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
