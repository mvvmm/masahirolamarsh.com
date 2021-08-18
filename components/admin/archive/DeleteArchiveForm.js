import { Formik } from "formik";
import { useState } from "react";
import SpinyIcon from "../SpinyIcon";
import { queueDeleteAllArchiveImages } from "../../../lib/aws";
import { deleteArchiveData } from "../../../lib/db";
import "react-datepicker/dist/react-datepicker.css";
import Carousel from "./Carousel";

export default function DeleteArchiveForm({
  session,
  updateArchiveData,
  data,
}) {
  const [message, setMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  async function deleteArchiveInDB(setSubmitting, resetForm) {
    const userID = session.user.id || null;

    try {
      await queueDeleteAllArchiveImages(userID, data.archiveID);
    } catch (err) {
      setMessage(err.message);
      setMessageSuccess(false);
      setShowMessage(true);
      return;
    }

    try {
      await deleteArchiveData(userID, data);
    } catch (err) {
      setMessage(err.message);
      setMessageSuccess(false);
      setShowMessage(true);
      return;
    }

    setMessage("Successfully deleted from archive");
    setMessageSuccess(true);
    setShowMessage(true);
    resetForm();
    setSubmitting(false);
    updateArchiveData();
    return;
  }

  return (
    <Formik
      initialValues={{}}
      validate={(values) => {}}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        deleteArchiveInDB(setSubmitting, resetForm);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <>
          {showMessage && (
            <div
              className={`${
                messageSuccess
                  ? "bg-green-100 border-green-700 text-green-700"
                  : "bg-red-100 border-red-700 text-red-700"
              } border p-2 mb-2 uppercase text-sm`}
            >
              {message}
            </div>
          )}
          <div className="pt-2 group">
            <div className="relative border border-b-0 border-gray-400 p-2 bg-gray-eee text-xs font-bold text-gray-500 space-y-0.5">
              <p>{data.archiveID}</p>
            </div>
            <Carousel archiveID={data.archiveID} imgs={data.imgs} />

            <div className="p-2 uppercase space-y-1 border border-t-0 border-gray-400 h-auto">
              <h2 className="text-2xl font-bold">{data.title}</h2>
              <p className="text-sm font-bold text-gray-600">
                {data.description}
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mb-0 mt-6">
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="button w-full bg-red-500"
              >
                <div className="flex w-max mx-auto">
                  {isSubmitting && <SpinyIcon />}
                  DELETE
                </div>
              </button>
            </div>
          </form>
        </>
      )}
    </Formik>
  );
}
