import { getSession } from "next-auth/client";
import Link from "next/link";
import Auth from "../../components/admin/Auth";

export default function admin({ session }) {
  return (
    <Auth session={session}>
      <h1 className="border-b text-3xl mb-4">ADMIN PANEL</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 space-x-12">
        <Link href="/admin/product">
          <a>
            <div className="group shadow-lg border p-4">
              <h1 className="text-2xl font-bold mb-8 transition group-hover:translate-x-1">
                Product
              </h1>
              <p>Manage your product.</p>
            </div>
          </a>
        </Link>

        <Link href="/admin/archive">
          <a>
            <div className="group shadow-lg border p-4">
              <h1 className="text-2xl font-bold mb-8 transition group-hover:translate-x-1">
                Archive
              </h1>
              <p>Manage your archive.</p>
            </div>
          </a>
        </Link>
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
