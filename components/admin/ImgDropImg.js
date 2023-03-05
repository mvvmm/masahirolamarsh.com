import { getBytes } from "../../lib/Img";
import { XIcon } from "@heroicons/react/outline";

export default function ImgDropImg({
  file,
  setFieldValue,
  values,
  ID,
  collection,
}) {
  function deleteItem() {
    const imgs = values.imgs.filter((img) => img !== file);
    setFieldValue("imgs", imgs);
  }
  return (
    <div className="flex justify-between items-center my-2">
      <div className="flex items-center w-10/12">
        <div className="mr-4 w-20 flex-shrink-0">
          {typeof file === "string" ? (
            <img
              className="object-contain"
              src={`https://cdn.masahirolamarsh.com/${collection}/${ID}/${file}`}
              alt={file}
            />
          ) : (
            <img
              className="object-contain"
              src={URL.createObjectURL(file)}
              alt={file.name}
            />
          )}
          {/* eslint-disable-next-line */}
        </div>
        <div className="text-sm uppercase truncate">
          {typeof file === "string" ? (
            <>
              <div className="truncate">{file}</div>
              <div className="text-gray-700">Hosted on S3</div>
            </>
          ) : (
            <>
              <div className="truncate">{file.name}</div>
              <div className="text-gray-700">{getBytes(file.size)}</div>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          onClick={deleteItem}
          className="hover:animate-spin text-red-700"
        >
          <XIcon height={20} width={20} />
        </button>
      </div>
    </div>
  );
}
