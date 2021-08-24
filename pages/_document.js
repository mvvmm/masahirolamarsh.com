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

          {/* Cormorant Garamond */}
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          />

          {/* Space Mono */}
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />

          {/* Inter Var */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          ></link>
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
