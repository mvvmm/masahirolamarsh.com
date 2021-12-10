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

export default function BidInput({ data }) {
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
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, setFieldValue }) => {
        const bid = values.bid;
        setTimeout(() => {
          setFieldValue("bid", "");
          alert(bid);
          setSuccess(true);
          setSubmitting(false);
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
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="pb-12">
            <label for="email" class="block text-sm font-medium text-gray-500">
              Email
            </label>
            <input
              className="w-full h-10 border-b-2 border-gray-600 text-white italic text-2xl placeholder-gray-600 focus:outline-none focus:border-gray-50 bg-black placeholder-transparent"
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
          </div>

          <div className="pb-12">
            <label for="bid" class="block text-sm font-medium text-gray-500">
              Bid
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="sm:text-sm">$</span>
              </div>
              <input
                onKeyPress={(event) => {
                  preventNonNumericalInput(event);
                }}
                className="pl-7 w-full peer appearance-none h-10 border-b-2 border-gray-600 text-white italic text-2xl placeholder-gray-600 focus:outline-none focus:border-gray-50 bg-black placeholder-transparent"
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
                <label for="currency" class="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                >
                  <option>USD</option>
                  <option>CAD</option>
                  <option>EUR</option>
                </select>
              </div>
            </div>
          </div>

          <div className="">
            hello
            {typeof errors.bid === "undefined" &&
              values.bid !== "" &&
              !isSubmitting && (
                <div
                  className="text-gray-600 hover:text-white hover:cursor-pointer"
                  onClick={handleSubmit}
                >
                  <ArrowNarrowRightIcon className="w-6" />
                </div>
              )}
            {isSubmitting === true && (
              <div className="p-0.5">
                <Spinner />
              </div>
            )}
            {success === true && <CheckIcon className="text-green-500 w-6" />}
          </div>
        </form>
      )}
    </Formik>
  );
}
