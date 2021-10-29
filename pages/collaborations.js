import Layout from "../components/Layout";

export default function Collaborations() {
  return (
    <Layout>
      <div className="h-28"></div>
      <div className="grid grid-cols-12 flex-grow">
        <div className="hidden lg:flex col-span-2"></div>
        <div className="col-span-12 lg:col-span-10 px-8">collaborations</div>
      </div>
    </Layout>
  );
}
