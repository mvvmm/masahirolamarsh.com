import "../styles/globals.css";
import { Provider as AuthProvider } from "next-auth/client";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-analytics.js"></script>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
