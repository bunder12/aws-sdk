import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const Uploader = () => {
  const axios = require("axios").default;

  const [link, setLink] = useState()

  const API_ENDPOINT =
    "https://snnypcf9xb.execute-api.ap-southeast-1.amazonaws.com/default/getPresignedImageURL";
  const handleChangeStatus = ({ meta, remove }, status) => {
    setLink(meta.previewUrl);
  };

  const handleSubmit = async (files) => {
    const f = files[0];
    console.log(f["file"]);
    // * GET request: presigned URL
    const response = await axios({
      method: "GET",
      url: API_ENDPOINT,
    });

    console.log("Response: ", response);

    // * PUT request: upload file to S3
    const result = await fetch(response.data.uploadURL, {
      method: "PUT",
      body: f["file"],
    });
    console.log("Result: ", result);
  };

  return (
    <>
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      hjello
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent="Drop A File"
      styles={{
        dropzone: { width: 400, height: 200 },
        dropzoneActive: { borderColor: "green" },
      }}
    />
    <a href={link}>{link}</a>
    </>
  );
};

<Uploader />;

export default Uploader;
