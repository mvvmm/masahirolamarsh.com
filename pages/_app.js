import "../styles/globals.css";
import { Provider as AuthProvider } from "next-auth/client";
import { MobileMenuProvider } from "../contexts/MobileMenu";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <MobileMenuProvider>
          <Component {...pageProps} />
        </MobileMenuProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
