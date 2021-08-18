import { format } from "date-fns";
import Carousel from "./Carousel";
import IconButton from "../IconButton";

export default function Archive({ data, openEditModal, openDeleteModal }) {
  return (
    <div className="group">
      <div className="relative border border-b-0 border-gray-400 p-2 bg-gray-eee text-xs font-bold text-gray-500 space-y-0.5">
        <div className="invisible group-hover:visible absolute top-2 right-2 z-10 space-x-2">
          <IconButton
            label="EDIT"
            icon="pencil"
            color="yellow"
            action={() => {
              openEditModal(data);
            }}
          />
          <IconButton
            label="DELETE"
            icon="trash"
            color="red"
            action={() => {
              openDeleteModal(data);
            }}
          />
        </div>

        <p>{data.archiveID}</p>
      </div>
      <Carousel archiveID={data.archiveID} imgs={data.imgs} />

      <div className="p-2 uppercase space-y-1 border border-t-0 border-gray-400 h-auto">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <p className="text-sm font-bold text-gray-600">{data.description}</p>
      </div>
    </div>
  );
}
