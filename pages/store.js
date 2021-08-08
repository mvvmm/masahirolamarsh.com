import Header from "../components/Header";
import Store from "../components/Store";
import StoreHeader from "../components/StoreHeader";
import { useSession } from "next-auth/client";
import { getAllActiveProducts } from "../lib/db";

export default function Home({ productData }) {
  const [session, isLoading] = useSession();
  return (
    <div>
      <Header />
      <StoreHeader session={session} />
      <Store productData={productData} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const productData = await getAllActiveProducts();
  return {
    props: { productData },
  };
}
