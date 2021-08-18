import Archive from "./Archive";

export default function ArchiveSection({
  archiveData,
  openEditModal,
  openDeleteModal,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cl:grid-cols-4 gap-8">
      {archiveData.map((archive) => (
        <Archive
          key={archive.archiveID}
          data={archive}
          openEditModal={openEditModal}
          openDeleteModal={openDeleteModal}
        />
      ))}
    </div>
  );
}
