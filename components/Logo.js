import Link from "next/link";

export default function Logo() {
  return (
    <div className="group fixed top-5 left-10 z-30">
      <Link href="/">
        <a>
          <img
            className="h-16 group-hover:block hidden border border-white"
            src="/img/thumb/white.png"
          />
          <img
            className="h-16 group-hover:hidden block border border-transparent"
            src="/img/thumb/black.png"
          />
        </a>
      </Link>
    </div>
  );
}
