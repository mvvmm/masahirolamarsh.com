import { useRouter } from "next/router";
import Link from "next/link";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useMobileMenu } from "../contexts/MobileMenu";

export default function TopBar({ links }) {
  const router = useRouter();
  const mobileMenu = useMobileMenu();

  return (
    <div className="w-full h-20 fixed z-20">
      <div className="grid-cols-12 h-full hidden lg:grid">
        <div className="col-span-2 my-auto mx-auto"></div>
        <nav className="col-span-10 flex flex-wrap gap-4 content-center uppercase">
          {links.map((link) => (
            <div className="group" key={link}>
              <Link href={`/${link}`}>
                <a>
                  <div
                    className={`p-2 group-hover:text-white ${
                      router.pathname.indexOf(`/${link}`) == 0
                        ? "text-white-500 border-b border-white"
                        : "text-trueGray-600"
                    }`}
                  >
                    {link}
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </nav>
      </div>
      <div className="h-full flex flex-wrap content-center lg:hidden justify-end pr-4 uppercase">
        {mobileMenu.isOpen ? (
          <XIcon
            className="w-6 font-light stroke-1 cursor-pointer text-trueGray-600 hover:text-white"
            onClick={() => {
              mobileMenu.setIsOpen(!mobileMenu.isOpen);
            }}
          />
        ) : (
          <MenuIcon
            className="w-6 font-light stroke-1 cursor-pointer text-trueGray-600 hover:text-white"
            onClick={() => {
              mobileMenu.setIsOpen(!mobileMenu.isOpen);
            }}
          />
        )}
      </div>
    </div>
  );
}
