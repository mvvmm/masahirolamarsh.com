import Layout from "../components/global/Layout";
import SectionHeader from "../components/global/SectionHeader";

export default function Custom404() {
  return (
    <Layout>
      <div className="py-32">
        <SectionHeader title="404 - Page not found." />
      </div>
    </Layout>
  );
}
