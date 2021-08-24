import Image from "next/image";

export default function ArchiveImages({ data }) {
  const baseImgPath = "https://cdn.masahirolamarsh.com/archive";
  console.log(data);
  return (
    <div className="mx-8">
      {data.map((archive) => (
        <div className="bg-black p-4 m-8" key={archive.archiveID}>
          <div className="mx-auto w-max">
            <Image
              src={`${baseImgPath}/${archive.archiveID}/${archive.imgs[0]}`}
              width={250}
              height={250}
              objectFit="contain"
              priority={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
