import { getAllCollections } from "../utils/shopify";
import Layout from "../components/global/Layout";
import SectionHeader from "../components/global/SectionHeader";

export default function collections({ allCollections }) {
  return (
    <Layout>
      <SectionHeader title="Collections" />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const allCollections = await getAllCollections();
  return {
    props: { allCollections },
  };
}
