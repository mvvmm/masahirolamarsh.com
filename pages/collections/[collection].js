import Link from "next/link";
import { getAllProductsByCollectionHandle } from "../../utils/shopify";

export default function Collection({ products, collectionHandle }) {
  return (
    <>
      <h2 className="pt-4 text-xl font-black">Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.node.id}>
            <Link
              href={`/collections/${collectionHandle}/products/${product.node.handle}`}
            >
              {product.node.handle}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps(context) {
  const collectionHandle = context.query.collection;
  const products = await getAllProductsByCollectionHandle({
    collectionHandle: collectionHandle,
  });
  return {
    props: { products, collectionHandle },
  };
}
