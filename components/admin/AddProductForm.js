import { Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import ImgDrop from "./ImgDrop";
import SpinyIcon from "./SpinyIcon";
import FormData from "form-data";

export default function AddProductForm({ session, closeModal }) {
  const [message, setMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  function addProductToDB(values, setSubmitting, resetForm) {
    const body = new FormData();
    values.imgs.forEach((file) => {
      body.append(file.name, file);
    });
    const data = {
      userID: session.user.id || null,
      values,
    };
    body.append("data", JSON.stringify(data));
    axios
      .post("/api/admin/products/add", body, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        setMessageSuccess(res.data.success);
        setMessage(res.data.message);
        setShowMessage(true);
        resetForm();
      })
      .catch((err) => {
        if (err.response.data.message) {
          setMessage(`${err.response.data.message}`);
          setMessageSuccess(false);
          setShowMessage(true);
        } else {
          setMessage(`Problem adding product to Database: ${err.message}`);
          setMessageSuccess(false);
          setShowMessage(true);
        }
      })
      .then(() => {
        setSubmitting(false);
      });
  }

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        price: "0.00",
        active: false,
        production_quantity: 0,
        remaining_quantity: 0,
        imgs: [],
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) errors.title = "REQUIRED";
        if (!values.description) errors.description = "REQUIRED";
        if (!values.price && values.price !== 0) errors.price = "REQUIRED";
        if (values.price < 0) errors.price = "CAN'T BE NEGATIVE";
        if (!values.production_quantity && values.production_quantity !== 0)
          errors.production_quantity = "REQUIRED";
        if (values.production_quantity < 0)
          errors.production_quantity = "CAN'T BE NEGATIVE";
        if (!values.remaining_quantity && values.remaining_quantity !== 0)
          errors.remaining_quantity = "REQUIRED";
        if (values.remaining_quantity < 0)
          errors.remaining_quantity = "CAN'T BE NEGATIVE";
        if (values.remaining_quantity > values.production_quantity)
          errors.remaining_quantity =
            "CAN'T BE GREATER THAN PRODUCTION QUANTITY";
        if (values.imgs.length === 0) errors.imgs = "MUST UPLOAD IMAGE";
        if (values.imgs.some((file) => file.size > 1000000))
          errors.imgs = "FILES MUST BE LESS THAN 1MB";
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) =>
        addProductToDB(values, setSubmitting, resetForm)
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

              <div className="mt-1 grid grid-cols-2 gap-8">
                <div>
                  <label htmlFor="price" className="form-label">
                    PRICE
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      $
                    </div>
                    <input
                      type="text"
                      name="price"
                      className="w-full form-field pl-7"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center"></div>
                  </div>

                  <p className="form-error">
                    {errors.price && touched.price && errors.price}
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    className="form-checkbox h-6 w-6 border-gray-300 shadow-sm border text-black focus-visible:outline-none focus-visible:ring-2 ring-offset-2 ring-black focus:border-black"
                    name="active"
                    type="checkbox"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.active}
                  />
                  <label htmlFor="active" className="ml-2 form-label uppercase">
                    {values.active ? "Active" : "Inactive"}
                  </label>
                </div>
              </div>

              <div className="mt-1 grid grid-cols-2 gap-8">
                <div>
                  <label htmlFor="production_quantity" className="form-label">
                    PRODUCTION QUANTITY
                  </label>
                  <input
                    className="w-full form-field"
                    type="number"
                    name="production_quantity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.production_quantity}
                  />
                  <p className="form-error">
                    {errors.production_quantity &&
                      touched.production_quantity &&
                      errors.production_quantity}
                  </p>
                </div>
                <div>
                  <label htmlFor="remaining_quantity" className="form-label">
                    REMAINING QUANTITY
                  </label>
                  <input
                    className="w-full form-field"
                    type="number"
                    name="remaining_quantity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.remaining_quantity}
                  />
                  <p className="form-error">
                    {errors.remaining_quantity &&
                      touched.remaining_quantity &&
                      errors.remaining_quantity}
                  </p>
                </div>
              </div>

              <div className="mt-1">
                <ImgDrop
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  values={values}
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
                  ADD PRODUCT
                </div>
              </button>
            </div>
            {/* <pre className="my-4 text-sm">
              {JSON.stringify({ values, errors }, null, 2)}
            </pre> */}
          </form>
        </>
      )}
    </Formik>
  );
}
