import Carousel from "./Carousel";

export default function Store() {
  return (
    <>
      <div className="py-8 bg-gray-eee mx-4 lg:mx-8">
        <div className="bg-black -mx-4 lg:-mx-8 text-white p-4">
          <Carousel />
        </div>
      </div>
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold -mt-5">PIECE TITLE</h2>
      </div>
      <div className="text-center">
        <button className="bg-black text-white text-xl px-4 py-2 font-bold">
          LEARN MORE
        </button>
      </div>
    </>
  );
}
