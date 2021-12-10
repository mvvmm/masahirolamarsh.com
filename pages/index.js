import { useState, useEffect } from "react";
import Newsletter from "../components/Newsletter";
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
        <span className="font-quintessential mb-4">
          <Bid01Header />
        </span>
        <span className="font-quintessential mb-4">
          <CountDown />
        </span>
        <Pieces />
      </div>
    </>
  );
}
