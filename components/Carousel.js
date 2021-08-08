export default function Carousel({ productData }) {
  return (
    <div className="flex">
      {productData.map((data) => (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ))}
    </div>
  );
}
