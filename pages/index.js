import Newsletter from "../components/Newsletter";
import Logo from "../components/Logo";
import Bid01Header from "../components/bid_01/Bid01Header";
import Pieces from "../components/bid_01/Pieces";
import CountDown from "../components/bid_01/CountDown";
import Head from "next/head";

export default function Home() {
  let rootDir = "https://www.masahirolamarsh.com";
  return (
    <>
      <Head>
        <title>Masahiro LaMarsh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content={`Masahiro LaMarsh - New York City Jeweler.`}
          key="head-description"
        />
        <meta
          property="og:title"
          content={`Masahiro LaMarsh`}
          key="head-ogtitle"
        />
        <meta
          property="og:description"
          content={`Masahiro LaMarsh - New York City Jeweler.`}
          key="head-ogdescription"
        />
        <meta
          property="og:image"
          content={`${rootDir}/img/masahirolamarsh.jpeg`}
          key="head-ogimage"
        ></meta>
        <meta property="og:url" content={`${rootDir}`} key="head-ogurl"></meta>
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="head-twittercard"
        ></meta>
        <meta
          name="twitter:image:alt"
          content="Masahiro Lamarsh - New York City Jeweler"
          key="head-twitterimgalt"
        ></meta>
        <meta
          property="og:site_name"
          content="Masahiro LaMarsh"
          key="head-ogsite_name"
        ></meta>
      </Head>
      <div>
        <Newsletter />
        <Logo />
        <span className="font-quintessential mb-4">
          <Bid01Header />
        </span>
        <CountDown />
        <Pieces />
      </div>
    </>
  );
}
