import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ImgDropImg from "./ImgDropImg";

export default function ImgDrop({ setFieldValue, setFieldTouched, values }) {
  const onDrop = useCallback(
    (droppedFiles) => {
      setFieldTouched("imgs", true);
      setFieldValue("imgs", [...values.imgs, ...droppedFiles]);
    },
    [values.imgs, setFieldValue, setFieldTouched]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      <label htmlFor="imgs" className="form-label">
        IMAGES
      </label>
      <div
        {...getRootProps()}
        className={`cursor-pointer form-field border-2 border-dashed ${
          isDragActive && "border-black"
        }`}
      >
        <input
          {...getInputProps()}
          onClick={() => {
            setFieldTouched("imgs", true);
          }}
          name="imgs"
          accept="image/png, image/jpeg"
        />
        <p>DRAG AND DROP IMAGES</p>
      </div>
      {values.imgs.length > 0 && (
        <div className="mt-8">
          {values.imgs.map((file) => (
            <ImgDropImg
              key={file.name}
              file={file}
              setFieldValue={setFieldValue}
              values={values}
            />
          ))}
        </div>
      )}
    </>
  );
}
