import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import TopBar from "./TopBar";

export default function Layout({ children }) {
  const links = ["store", "archive", "collaborations", "about"];
  return (
    <>
      <TopBar links={links} />
      <div className="mx-8">
        <div className="min-h-screen flex flex-col">
          <MobileMenu links={links} />
          <Logo />
          <div className="flex flex-col flex-grow items-stretch">
            {children}
          </div>
        </div>
        <div className="h-48 bg-red-500">footer</div>
      </div>
    </>
  );
}
