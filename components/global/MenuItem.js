import Link from "next/link";
import { useRouter } from "next/router";
import MenuItemSpinner from "./MenuItemSpinner";

export default function MenuItem({ item }) {
  const router = useRouter();
  const isActive = router.pathname.startsWith(item.href);

  return (
    <li className="flex py-2">
      <Link href={item.href}>
        <a className="group flex w-full items-center rounded-sm text-2xl font-normal uppercase ring-black ring-offset-2 focus:outline-none focus-visible:ring-1">
          <MenuItemSpinner isActive={isActive} />
          <div className="flex-grow">{item.label}</div>
        </a>
      </Link>
    </li>
  );
}
