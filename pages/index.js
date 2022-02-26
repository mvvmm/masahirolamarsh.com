import { getAllCollections, getAllProducts } from "../utils/shopify";
import Link from "next/link";
import Layout from "../components/global/Layout";
import Hero from "../components/index/Hero";
import SectionHeader from "../components/global/SectionHeader";
import Section from "../components/global/Section";

export default function Home({ allProducts, allCollections }) {
  return (
    <Layout overlapHeader>
      <Hero />
      <Section>
        <SectionHeader title="Collections" />
        <ul>
          {allCollections.map((collection) => (
            <li key={collection.node.id}>
              <Link href={`/collections/${collection.node.handle}`}>
                {collection.node.handle}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <SectionHeader title="Products" />
        <ul>
          {allProducts.map((product) => (
            <li key={product.node.id}>
              <Link
                href={`/collections/${product.node.collections.edges[0].node.handle}/products/${product.node.handle}`}
              >
                {product.node.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const allProducts = await getAllProducts();
  const allCollections = await getAllCollections();
  return {
    props: { allProducts, allCollections },
  };
}
