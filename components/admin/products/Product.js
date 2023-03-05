import { format } from "date-fns";
import Carousel from "./Carousel";
import IconButton from "../IconButton";

export default function Product({ data, openEditModal }) {
  return (
    <div className="group">
      <div className="relative border border-b-0 border-gray-400 p-2 bg-gray-eee text-xs font-bold text-gray-500 space-y-0.5">
        <div className="invisible group-hover:visible absolute top-2 right-2">
          <IconButton
            label="EDIT"
            icon="pencil"
            color="yellow"
            action={() => {
              openEditModal(data.productID);
            }}
          />
        </div>

        <p>{data.productID}</p>
        <p>{format(new Date(data.dateAdded), "MMMM d, yyyy hh:mm a")}</p>
        <p>
          {data.remaining_quantity} remaining of {data.production_quantity}
        </p>
        {data.active ? (
          <p className="text-green-500">Active</p>
        ) : (
          <p className="text-red-500">Inactive</p>
        )}
      </div>
      <Carousel productID={data.productID} imgs={data.imgs} />

      <div className="p-2 uppercase space-y-1 border border-t-0 border-gray-400 h-auto">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <div className="flex space-x-2">
          <p className="font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(data.price)}
          </p>
          {data.remaining_quantity === 0 && (
            <p className="text-red-500 font-bold">SOLD OUT</p>
          )}
        </div>
        <p className="text-sm font-bold text-gray-600">{data.description}</p>
      </div>
    </div>
  );
}
