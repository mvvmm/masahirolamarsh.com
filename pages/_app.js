import "../styles/globals.css";
import { Provider as AuthProvider } from "next-auth/client";
import { MobileMenuProvider } from "../contexts/MobileMenu";

// Hooks
import { useRouter } from "next/router";
import { useEffect } from "react";

// Utils
import { isBrowser } from "../utils/browser";
import * as gtag from "../utils/gtag";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const csr = isBrowser();
  useEffect(() => {
    if (csr) gtag.pageView("/");
  }, [csr]);

  useEffect(() => {
    const handleRouteChange = (url) => gtag.pageView(url);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

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
