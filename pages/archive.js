import { getAllArchiveData, getTypes } from "../lib/db";
import Layout from "../components/Layout";
import SideBar from "../components/archive/SideBar";
import ArchiveImages from "../components/archive/ArchiveImages";
import { ArchiveProvider } from "../contexts/Archive";

export default function Archive({ archiveData, types }) {
  return (
    <Layout>
      <ArchiveProvider archiveData={archiveData} types={types}>
        <div className="h-28"></div>
        <div className="grid grid-cols-12 flex-grow">
          <div className="hidden lg:flex col-span-2">
            <SideBar />
          </div>
          <div className="col-span-12 lg:col-span-10 px-8">
            <ArchiveImages />
          </div>
        </div>
      </ArchiveProvider>
    </Layout>
  );
}

export async function getServerSideProps() {
  const archiveData = await getAllArchiveData();
  const types = await getTypes();
  return { props: { archiveData, types } };
}
