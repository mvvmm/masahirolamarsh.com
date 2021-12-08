export default function PieceModalBody({
  data,
  activeImageIdx,
  setActiveImageIdx,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col">
        <div className="mb-4">
          <img
            src={data.imgs[activeImageIdx]}
            className="mx-auto max-w-xs lg: max-w-full"
          />
        </div>
        <div className="flex flex-row space-x-4 mx-auto">
          {data.imgs.map((img, i) => (
            <img
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
      <div>yes</div>
    </div>
  );
}
