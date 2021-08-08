import { Formik } from "formik";
import { useState } from "react";
import ImgDrop from "../ImgDrop";
import SpinyIcon from "../SpinyIcon";
import { editProductImages } from "../../../lib/aws";
import { editProductData } from "../../../lib/db";
// import { editProductData } from "../../../lib/db";

export default function EditProductForm({
  session,
  closeModal,
  updateProductData,
  data,
}) {
  const [message, setMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  async function editProductInDB(values, setSubmitting, resetForm, productID) {
    const userID = session.user.id || null;

    try {
      await editProductImages(userID, productID, values.imgs);
    } catch (err) {
      setMessage(err.message);
      setMessageSuccess(false);
      setShowMessage(true);
      return;
    }

    const productData = {
      ...values,
    };
    productData.imgs = productData.imgs.map((file) =>
      typeof file === "string" ? file : file.path
    );

    try {
      await editProductData(userID, productID, productData);
    } catch (err) {
      setMessage(err.message);
      setMessageSuccess(false);
      setShowMessage(true);
      return;
    }

    setMessage("Successfully updated product");
    setMessageSuccess(true);
    setShowMessage(true);
    updateProductData();
    return;
  }

  return (
    <Formik
      initialValues={{
        title: data.title,
        description: data.description,
        price: data.price,
        active: data.active,
        production_quantity: data.production_quantity,
        remaining_quantity: data.remaining_quantity,
        imgs: data.imgs,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) errors.title = "REQUIRED";
        if (!values.description) errors.description = "REQUIRED";
        if (!values.price && values.price !== 0) errors.price = "REQUIRED";
        if (
          !values.price.match(
            /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/
          )
        )
          errors.price = "WRONG FORMAT.";
        if (values.price < 0) errors.price = "CAN'T BE NEGATIVE";
        if (values.price.length === 0) errors.price = "REQUIRED";
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
        editProductInDB(values, setSubmitting, resetForm, data.productID)
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
                    checked={values.active}
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
                  productID={data.productID}
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
                  UPDATE PRODUCT
                </div>
              </button>
            </div>
          </form>
        </>
      )}
    </Formik>
  );
}
