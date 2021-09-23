import { Formik } from "formik";
import { useState, useEffect } from "react";
import ImgDrop from "../ImgDrop";
import SpinyIcon from "../SpinyIcon";
import { editArchiveImages } from "../../../lib/aws";
import { editArchiveData } from "../../../lib/db";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTypes } from "../../../lib/db";

export default function EditArchiveForm({ session, updateArchiveData, data }) {
  const [types, setTypes] = useState([]);
  const [message, setMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    async function getTypesFromFirebase() {
      setTypes(await getTypes());
    }
    getTypesFromFirebase();
  }, []);

  async function editArchiveInDB(values, setSubmitting, resetForm, archiveID) {
    const userID = session.user.id || null;

    try {
      await editArchiveImages(userID, archiveID, values.imgs);
    } catch (err) {
      setMessage(err.message);
      setMessageSuccess(false);
      setShowMessage(true);
      return;
    }

    const archiveData = {
      ...values,
    };
    archiveData.imgs = archiveData.imgs.map((file) =>
      typeof file === "string" ? file : file.path
    );

    try {
      await editArchiveData(userID, archiveID, archiveData);
    } catch (err) {
      setMessage(err.message);
      setMessageSuccess(false);
      setShowMessage(true);
      return;
    }

    setMessage("Successfully updated archive");
    setMessageSuccess(true);
    setShowMessage(true);
    updateArchiveData();
    return;
  }

  return (
    <Formik
      initialValues={{
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        type: data.type,
        recipient: data.recipient,
        imgs: data.imgs,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) errors.title = "REQUIRED";
        if (!values.description) errors.description = "REQUIRED";
        if (values.imgs.length === 0) errors.imgs = "MUST UPLOAD IMAGE";
        if (values.imgs.some((file) => file.size > 1000000))
          errors.imgs = "FILES MUST BE LESS THAN 1MB";
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) =>
        editArchiveInDB(values, setSubmitting, resetForm, data.archiveID)
      }
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => (
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
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="mb-0 mt-6"
          >
            <div>
              <div className="mt-1">
                <label htmlFor="title" className="form-label">
                  TITLE
                </label>
                <input
                  className="w-full form-field"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <p className="form-error">
                  {errors.title && touched.title && errors.title}
                </p>
              </div>

              <div className="mt-1">
                <label htmlFor="date" className="form-label">
                  DATE
                </label>
                <DatePicker
                  selected={values.date}
                  dateFormat="MMMM d, yyyy"
                  className="w-full form-field"
                  name="date"
                  onChange={(date) => setFieldValue("date", date)}
                />
                <p className="form-error">
                  {errors.date && touched.date && errors.date}
                </p>
              </div>

              <div className="mt-1">
                <label htmlFor="description" className="form-label">
                  DESCRIPTION
                </label>
                <textarea
                  className="w-full form-field"
                  name="description"
                  rows="4"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                <p className="form-error">
                  {errors.description &&
                    touched.description &&
                    errors.description}
                </p>
              </div>

              <div className="mt-1">
                <label htmlFor="type" className="form-label">
                  TYPE
                </label>
                <select
                  className="w-full form-field"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled selected>
                    Select Type
                  </option>
                  {types.map((type) => (
                    <option value={type} label={type} key={type} />
                  ))}
                </select>
                <p className="form-error"></p>
              </div>

              <div className="mt-1">
                <label htmlFor="recipient" className="form-label">
                  RECIPIENT
                </label>
                <input
                  className="w-full form-field"
                  type="text"
                  name="recipient"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.recipient}
                />
                <p className="form-error"></p>
              </div>

              <div className="mt-1">
                <ImgDrop
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  values={values}
                  ID={data.archiveID}
                  collection="archive"
                />
                <p className="form-error">
                  {errors.imgs && touched.imgs && errors.imgs}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="button w-full mt-4"
              >
                <div className="flex w-max mx-auto">
                  {isSubmitting && <SpinyIcon />}
                  UPDATE ARCHIVE
                </div>
              </button>
            </div>
          </form>
        </>
      )}
    </Formik>
  );
}
