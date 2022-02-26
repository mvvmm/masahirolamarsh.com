import Footer from "./Footer";
import Header from "./Header";
import Content from "../global/Content";

export default function Layout({ children, overlapHeader = false }) {
  return (
    <>
      <Header overlap={overlapHeader} />
      <Content overlap={overlapHeader}>{children}</Content>
      <Footer />
    </>
  );
}
