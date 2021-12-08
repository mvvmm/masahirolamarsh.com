import Link from "next/link";
import ComingSoon from "../components/ComingSoon";
import { useState, useEffect } from "react";
import Newsletter from "../components/Newsletter";
import Bid01Title from "../components/bid_01/Bid01Header";
import Logo from "../components/Logo";
import Bid01Header from "../components/bid_01/Bid01Header";
import Pieces from "../components/bid_01/Pieces";
import CountDown from "../components/bid_01/CountDown";

export default function Home() {
  return (
    <>
      <div>
        <Newsletter />
        <Logo />
        <Bid01Header />
        <CountDown endDate="December 18, 2021 12:00:00" />
        <Pieces />
      </div>
    </>
  );
}
