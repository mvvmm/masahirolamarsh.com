import Header from "../components/Header";
import Store from "../components/Store";
import StoreHeader from "../components/StoreHeader";
import { useSession } from "next-auth/client";
import { getAllActiveProducts } from "../lib/db";
import Layout from "../components/Layout";

export default function Home({ productData }) {
  const [session, isLoading] = useSession();
  return (
    <Layout>
      <div className="h-28"></div>
      <div className="grid grid-cols-12 flex-grow">
        <div className="hidden lg:flex col-span-2"></div>
        <div className="col-span-12 lg:col-span-10 px-8">store</div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const productData = await getAllActiveProducts();
  return {
    props: { productData },
  };
}
