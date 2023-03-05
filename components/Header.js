import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div>
      <div className="h-auto p-4 lg:flex lg:flex-row-reverse lg:justify-between">
        <nav className="mb-4 flex w-full justify-between lg:mb-0 lg:w-auto lg:flex-wrap lg:gap-8 content-center">
          <Link href="/">
            <a className="sm:text-lg md:text-xl font-bold">STORE</a>
          </Link>

          <Link href="/">
            <a className="sm:text-lg md:text-xl font-bold">ARCHIVE</a>
          </Link>

          <Link href="/">
            <a className="sm:text-lg md:text-xl font-bold">COLLABORATIONS</a>
          </Link>

          <Link href="/">
            <a className="sm:text-lg md:text-xl font-bold">ABOUT</a>
          </Link>
        </nav>
        <div className="w-max mx-auto lg:mx-0">
          <Link href="/">
            <a>
              <Image
                className="cursor-pointer"
                src="https://cdn.masahirolamarsh.com/assets/img/thumb/black.webp"
                alt="Masahiro LaMarsh Corp Logo"
                width={75}
                height={75}
                objectFit="contain"
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
