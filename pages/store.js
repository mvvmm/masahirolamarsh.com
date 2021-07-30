import Header from "../components/Header";
import Store from "../components/Store";
import StoreHeader from "../components/StoreHeader";
import { getSession, useSession } from "next-auth/client";

export default function Home({ session }) {
  return (
    <h1>
      <Header />
      <StoreHeader session={session} />
      <Store />
    </h1>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
