import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../contexts/Cart";
import CartPanel from "./CartPanel";

export default function Header({ overlap }) {
  const cart = useCart();
  return (
    <>
      <CartPanel />
      <div className="pointer-events-none fixed top-0 w-full z-40">
        <div className="flex items-center justify-between p-8">
          <div className="pointer-events-auto">
            <Icon icon="bytesize:menu" className="w-6 h-6 cursor-pointer" />
          </div>
          <div className="group pointer-events-auto">
            <Link href="/">
              <a>
                <img className="h-16" src="/img/thumb/black.png" />
              </a>
            </Link>
          </div>
          <div className="relative pointer-events-auto">
            <Icon
              icon="bytesize:bag"
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                cart.setPanelOpen(true);
              }}
            />
            <div className="pointer-events-none absolute -translate-y-1/2 -translate-x-1/2 inset-y-1/2 inset-x-1/2 w-4 h-4 flex items-center justify-center rounded-full text-xxs mt-0.5">
              {cart?.data?.lines?.edges?.length || 0}
            </div>
          </div>
        </div>
      </div>
      {/* Invisible copy to push down content */}
      <div
        className={`${
          overlap && "hidden"
        } w-full invisible pointer-events-none`}
      >
        <div className="flex items-center justify-between p-8">
          <div>
            <Icon icon="bytesize:menu" className="w-6 h-6" />
          </div>
          <div className="group cursor-pointer">
            <img
              className="h-16 group-hover:hidden"
              src="/img/thumb/black.png"
            />
            <img
              className="h-16 hidden group-hover:block"
              src="/img/thumb/white.png"
            />
          </div>
          <div>
            <Icon icon="bytesize:bag" className="w-6 h-6" />
          </div>
        </div>
      </div>
    </>
  );
}
