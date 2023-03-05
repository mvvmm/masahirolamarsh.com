import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { signIn, signOut } from "next-auth/client";

export default function StoreHeader({ session }) {
  return (
    <div className="lg:flex lg:justify-end lg:-mt-4 mb-4">
      <div className="bg-gray-eee w-max mx-auto py-2 px-4 pr-6 sm:text-lg md:text-xl lg:mx-0">
        <div className="flex gap-8 font-bold">
          <div
            onClick={session ? () => signOut() : () => signIn()}
            className="cursor-pointer"
          >
            {session ? `LOGOUT` : `LOGIN`}
          </div>
          <Link href="/">ORDERS</Link>
          <Link href="/" passHref>
            <div className="relative cursor-pointer">
              <ShoppingBagIcon className="w-7 h-7 font-bold" />
              <div className="flex flex-wrap w-6 h-6 absolute -top-2 -right-4 bg-black rounded-full border-2 border-white text-white text-center content-center">
                <p className="text-center w-full mr-px mb-px font-normal text-base">
                  2
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="mt-2 text-center border border-black text-sm">
          {session ? session.user.name : "..."}
        </div>
      </div>
    </div>
  );
}
