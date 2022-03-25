import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../contexts/Cart";
import CartPanel from "./CartPanel";
import MenuPanel from "./MenuPanel";

export default function Header({ overlap }) {
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <CartPanel />
      <MenuPanel open={menuOpen} setOpen={setMenuOpen} />
      <div className="pointer-events-none fixed top-0 z-40 w-full">
        <div className="flex items-center justify-between p-8">
          <div className="pointer-events-auto">
            <Icon
              icon="bytesize:menu"
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                setMenuOpen(true);
              }}
            />
          </div>
          <div className="group pointer-events-auto">
            <Link href="/">
              <a>
                <img
                  className="h-16"
                  src="/img/thumb/black.png"
                  alt="Masahiro LaMarsh thumb"
                />
              </a>
            </Link>
          </div>
          <div className="pointer-events-auto relative">
            <Icon
              icon="bytesize:bag"
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                cart.setPanelOpen(true);
              }}
            />
            <div className="pointer-events-none absolute inset-y-1/2 inset-x-1/2 mt-0.5 flex h-4 w-4 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full text-xxs">
              {cart?.data?.lines?.edges?.length || 0}
            </div>
          </div>
        </div>
      </div>
      {/* Invisible copy to push down content */}
      <div
        className={`${
          overlap && "hidden"
        } pointer-events-none invisible w-full`}
      >
        <div className="flex items-center justify-between p-8">
          <div className="pointer-events-auto">
            <Icon
              icon="bytesize:menu"
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                setMenuOpen(true);
              }}
            />
          </div>
          <div className="group pointer-events-auto">
            <Link href="/">
              <a>
                <img
                  className="h-16"
                  src="/img/thumb/black.png"
                  alt="Masahiro LaMarsh thumb"
                />
              </a>
            </Link>
          </div>
          <div className="pointer-events-auto relative">
            <Icon
              icon="bytesize:bag"
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                cart.setPanelOpen(true);
              }}
            />
            <div className="pointer-events-none absolute inset-y-1/2 inset-x-1/2 mt-0.5 flex h-4 w-4 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full text-xxs">
              {cart?.data?.lines?.edges?.length || 0}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
