export default function Carousel({ productData }) {
  return (
    <div className="flex">
      {productData.map((data) => (
        <pre key={data.productID}>{JSON.stringify(data, null, 2)}</pre>
      ))}
    </div>
  );
}
