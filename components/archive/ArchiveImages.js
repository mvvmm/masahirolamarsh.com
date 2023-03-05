import Image from "next/image";
import { useArchive } from "../../contexts/Archive";

export default function ArchiveImages() {
  const baseImgPath = "https://cdn.masahirolamarsh.com/archive";
  const archive = useArchive();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-12 gap-y-16">
      {archive.data.map((el) => (
        <div className="group cursor-pointer" key={el.archiveID}>
          <div
            className="w-full h-72 p-4 mx-auto relative transition-transform duration-500 group-hover:scale-110"
            key={el.archiveID}
          >
            <Image
              src={`${baseImgPath}/${el.archiveID}/${el.imgs[0]}`}
              layout="fill"
              objectFit="contain"
              priority={true}
            />
          </div>
          <h2 className="mt-4 ml-12 text-black group-hover:text-trueGray-400">
            {el.title}
          </h2>
        </div>
      ))}
    </div>
  );
}
