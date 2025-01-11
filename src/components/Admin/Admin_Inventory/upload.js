import React, { useState } from 'react';

function UploadImageFunction({ onImageUpload }) {
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;
    setLoading(true);
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "")
    data.append("cloud_name", "key")

    const res = await fetch("YOUR CLOUDINARY API", { //https://api.cloudinary.com/v1_1/???/image/upload
      method: "POST",
      body: data
    });

    const uploadImageURL = await res.json();
    setUploadedImageUrl(uploadImageURL.url)
    console.log(uploadImageURL.url)
    onImageUpload(uploadImageURL.url); 
    setLoading(false);
  };

  return (
    <>
      <div className="file-upload">
        <div className="upload-container">
          <div className="upload-icon">
            {
            loading ? (
              <img src="uploading_icon.svg" alt="uploading_icon" />
            ) : uploadedImageUrl ? (
              <img src="/home_assets/check_icon.svg" alt="check_icon" className='w-12 h-12 pb-5' />
            ) : (
              <img src="/home_assets/uploading_icon.svg" alt="upload_icon" className='w-12 h-12 pb-5'/>
            )
            }
          </div>

          <input
            type="file"
            className="file-input"
            onChange={handleFileUpload}
          ></input>

          {uploadedImageUrl && (
            <div className="preview-container scale-50">
              <img
                src={uploadedImageUrl}
                alt="Uploaded Preview"
                className="preview-image"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UploadImageFunction;
