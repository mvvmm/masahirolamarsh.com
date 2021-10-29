import { useMobileMenu } from "../contexts/MobileMenu";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MobileMenu({ links }) {
  const router = useRouter();
  const mobileMenu = useMobileMenu();

  function handleClick(link) {
    router.push(`/${link}`);
    mobileMenu.setIsOpen(false);
  }

  return (
    <div
      className={`${
        mobileMenu.isOpen ? "block" : "hidden"
      } lg:hidden h-screen z-10 bg-black w-full`}
    >
      <div className="h-full flex flex-col overflow-hidden">
        <div className="mt-28 flex flex-col text-4xl uppercase">
          {links.map((link) => (
            <div className="group" key={link}>
              <a
                className="cursor-pointer"
                onClick={() => {
                  handleClick(link);
                }}
              >
                <div
                  className={`p-2 group-hover:text-white ${
                    router.pathname.indexOf(`/${link}`) == 0
                      ? "text-white-500  border-white"
                      : "text-trueGray-600 border-black"
                  } border-b`}
                >
                  {link}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
