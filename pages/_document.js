import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Google Fonts Preconnect */}

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />

          {/* EB Garamond */}
          <link
            href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Quintessential&display=swap"
            rel="stylesheet"
          />

          {/* <Script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js"></Script>
          <Script src="https://www.gstatic.com/firebasejs/8.8.0/firebase-analytics.js"></Script> */}
        </Head>
        <body className="font-garamond">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
