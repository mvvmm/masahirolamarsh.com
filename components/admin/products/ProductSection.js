import Product from "./Product";

export default function ProductSection({ productData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cl:grid-cols-4 gap-8">
      {productData.map((product) => (
        <Product key={product.productID} data={product} />
      ))}
    </div>
  );
}
