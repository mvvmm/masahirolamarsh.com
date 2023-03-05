import { useArchive } from "../../contexts/Archive";

export default function SideBar() {
  const archive = useArchive();

  return (
    <div className="flex flex-col sticky justify-end bottom-8 self-end uppercase">
      <div className="group">
        <div
          className={`${
            archive.filterBy === "all" ? "text-white" : "text-trueGray-600"
          } p-1  group-hover:text-white cursor-pointer`}
          onClick={() => {
            archive.setFilterBy("all");
          }}
        >
          all
        </div>
      </div>
      {archive.types.map((type) => (
        <div className="group" key={type}>
          <div
            className={`${
              archive.filterBy === type ? "text-white" : "text-trueGray-600"
            } p-1 group-hover:text-white cursor-pointer`}
            onClick={() => {
              archive.setFilterBy(type);
            }}
          >
            {type}
          </div>
        </div>
      ))}
    </div>
  );
}
