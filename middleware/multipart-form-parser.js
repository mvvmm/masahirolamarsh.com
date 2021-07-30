import formidable from "formidable";

const form = formidable({ multiples: true });

export default async function parseMultipartForm(req, res, next) {
  const contentType = req.headers["content-type"];
  if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
    form.onPart = function (part) {
      if (!part.filename) {
        form.handlePart(part);
        return;
      }
      part.on("data", function (data) {
        part.data = data;
      });
      part.on("end", function () {});
      part.on("error", function (err) {
        res.status(500).json({
          success: false,
          message: `Problem with middleware: ${err}`,
        });
        return;
      });
    };
    form.parse(req, (err, fields, files) => {
      if (!err) {
        req.body = fields;
      }
      next();
    });
  } else {
    res.status(500).json({
      success: false,
      message: `Problem with middleware: ${err}`,
    });
    next();
  }
}
