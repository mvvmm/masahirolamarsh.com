import Image from "next/image";

export default function MenuItemSpinner({ isActive }) {
  return (
    <div
      className={`align-center flex h-6 w-12 animate-spin-slow group-hover:visible group-hover:opacity-30 ${
        isActive ? "visible group-hover:opacity-100" : "invisible"
      }`}
    >
      <Image
        src="/img/ring.webp"
        alt="rotating ring"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
}
