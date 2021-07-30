import { signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";

export default function Auth({ session, children }) {
  const router = useRouter();
  return (
    <div className="max-w-screen-xl p-8 mx-auto">
      <div>
        {session ? (
          session.user.role === "admin" ? (
            <div>
              <div className="mb-8">
                <div
                  onClick={() => router.push("/admin")}
                  className="group mb-2 cursor-pointer p-2 shadow-md border-black border-2 w-max"
                >
                  <h1 className="text-3xl font-bold transition duration:250 group-hover:translate-x-1">
                    ADMIN
                  </h1>
                  <h2>{session.user.name}</h2>
                  <div className="flex flex-wrap">
                    <a className="a">
                      <p className="text-sm" onClick={() => signOut()}>
                        Logout
                      </p>
                    </a>
                  </div>
                </div>
              </div>
              {children}
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">
                You do not have permission to access this page.
              </p>
              <button onClick={() => signOut()} className="button">
                LOGOUT
              </button>
            </div>
          )
        ) : (
          <div className="text-center">
            <p className="mb-4">Login to an admin account to view this page.</p>
            <button onClick={() => signIn()} className="button">
              LOGIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
