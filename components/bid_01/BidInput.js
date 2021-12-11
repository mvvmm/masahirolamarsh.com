import { ArrowNarrowRightIcon, CheckIcon } from "@heroicons/react/solid";
import { Formik } from "formik";
import { useState } from "react";
import Spinner from "../Spinner";

function preventNonNumericalInput(e) {
  e = e || window.event;
  var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
  var charStr = String.fromCharCode(charCode);

  if (!charStr.match(/^[0-9,]+$/)) e.preventDefault();
}

export default function BidInput({ data, bidMade }) {
  const [success, setSuccess] = useState(null);

  return (
    <Formik
      initialValues={{ email: "", bid: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        } else if (!values.bid) {
          errors.bid = "Required";
        } else if (
          /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(
            values.bid
          ) === 0
        ) {
          errors.bid = "Invalid Currency";
        } else if (values.bid <= data.reserve) {
          errors.bid = "Bid must be greater than reserve";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, setFieldValue }) => {
        const bid = values.bid;
        setTimeout(() => {
          setFieldValue("bid", "");
          setFieldValue("email", "");
          setSuccess(true);
          setSubmitting(false);
          bidMade();
        }, 2000);
      }}
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
      }) => (
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-bold mb-2 text-gray-500"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-black placeholder-gray-600"
              id="email"
              name="email"
              type="text"
              placeholder="Emaill address"
              onFocus={() => {
                setSuccess(null);
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            ></input>
            <small className="pl-2 text-red-500">
              {errors.email && touched.email && errors.email}
            </small>
          </div>
          <div className="mb-4">
            <label
              htmlFor="bid"
              className="block text-sm font-medium text-gray-500"
            >
              Bid
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="sm:text-sm">$</span>
              </div>
              <input
                onKeyPress={(event) => {
                  preventNonNumericalInput(event);
                }}
                className="shadow appearance-none border rounded w-full pl-7 pr-12 py-2 text-white leading-tight focus:outline-none focus:shadow-outline bg-black placeholder-gray-600"
                id="bid"
                name="bid"
                type="text"
                placeholder={data.reserve}
                onFocus={() => {
                  setSuccess(null);
                }}
                onChange={(e) => {
                  let toBe = parseInt(
                    e.target.value.replace(/,/gi, "")
                  ).toLocaleString();
                  if (toBe === "NaN") toBe = 0;
                  setFieldValue("bid", toBe);
                }}
                onBlur={handleBlur}
                value={values.bid}
              ></input>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <span className="pr-4">USD</span>
              </div>
            </div>
            <small className="pl-2 text-red-500">
              {errors.bid && touched.bid && errors.bid}
            </small>
          </div>
          <div>
            <button
              className={`${
                Object.keys(errors).length === 0
                  ? ""
                  : "opacity-0 cursor-not-allowed"
              } inline-flex items-center justify-center text-center w-full bg-black border border-white font-bold py-2 px-4 rounded hover:bg-green-500`}
            >
              {isSubmitting === true && (
                <div className="w-4 h-4 mr-2">
                  <Spinner />
                </div>
              )}
              {success === true && (
                <CheckIcon className="text-green-500 w-4 h-4 mr-2" />
              )}
              Submit bid
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
