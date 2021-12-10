import BidInput from "./BidInput";

export default function PieceModalBody({
  data,
  activeImageIdx,
  setActiveImageIdx,
  closeModal,
}) {
  return (
    <>
      <div
        className="absolute top-5 right-7 text-2xl cursor-pointer hover:text-red-500 hover:border border-red-500 p-2"
        onClick={closeModal}
      >
        X
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col">
          <div className="mb-4">
            <img
              src={data.imgs[activeImageIdx]}
              className="mx-auto lg: max-w-full"
            />
          </div>
          <div className="flex flex-row space-x-4 mx-auto">
            {data.imgs.map((img, i) => (
              <img
                key={img}
                className={` ${
                  activeImageIdx == i && "border border-white"
                } hover:scale-105 cursor-pointer rounded-sm`}
                src={img}
                width={50}
                height={50}
                onClick={() => {
                  setActiveImageIdx(i);
                }}
              />
            ))}
          </div>
        </div>
        <div className="p-4 flex flex-col justify-between">
          <div className="mb-8">
            <h1 className="text-4xl mb-4">{data.title}</h1>
            <p>{data.description}</p>
          </div>
          <div className="border-2 border-gray-500 p-4">
            <BidInput data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
