import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_secret: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

const uploadOnCloudnary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    alert("file is uploaded successfuly");
    console.log(response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the localy saved temp file as the upload get failed
    return null;
  }
};

export {uploadOnCloudnary}