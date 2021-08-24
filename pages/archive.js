import ArchiveImages from "../components/archive/ArchiveImages";
import NavBar from "../components/NavBar";
import { getAllArchiveData } from "../lib/db";

export default function archive({ archiveData }) {
  return (
    <>
      <NavBar />
      <h1 className="text-center">ARCHIVE</h1>
      <ArchiveImages data={archiveData} />
    </>
  );
}

export async function getServerSideProps() {
  const archiveData = await getAllArchiveData();
  return { props: { archiveData } };
}
