import { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import { ArrowNarrowRightIcon, CheckIcon, XIcon } from "@heroicons/react/solid";
import Spinner from "./Spinner";
import { addToNewsLetter } from "../lib/db";

export default function Newsletter() {
  const [success, setSuccess] = useState(null);
  const inputRef = useRef();

  return (
    <div className="w-full pr-12 pl-24 lg:pl-12 max-w-screen-sm mx-auto">
      <Formik
        enableReinitialize
        initialValues={{ email: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setFieldValue }) => {
          const email = values.email;
          try {
            const res = await addToNewsLetter(email);
            setSuccess(true);
          } catch (err) {
            setSuccess(false);
          }
          setFieldValue("email", "");
          inputRef.current.blur();
          setSubmitting(false);
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
            className="mt-12"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="relative w-full flex ">
              <div className="flex-grow">
                <div className="mb-4">
                  <input
                    autoFocus="false"
                    ref={inputRef}
                    className="w-full peer appearance-none h-10 border-b-2 border-gray-600 text-white italic text-2xl placeholder-gray-600 focus:outline-none focus:border-gray-50 bg-black placeholder-transparent"
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
                  <label
                    htmlFor="email"
                    className="block truncate absolute left-0 -top-2.5 uppercase text-xs text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-gray-500 hover:cursor-text"
                  >
                    newsletter: Enter email
                  </label>
                  <input type="hidden" autoFocus="true" />
                </div>
              </div>
              <div className="absolute -right-8 bottom-2 m-1 ml-4 mb-4 w-6">
                {typeof errors.email === "undefined" &&
                  values.email !== "" &&
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
                {success === true && (
                  <CheckIcon className="text-green-500 w-6" />
                )}
                {success === false && <XIcon className="text-red-500 w-6" />}
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
