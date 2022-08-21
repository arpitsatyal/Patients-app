const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

async function uploadImage(image: any) {
  const result = await cloudinary.v2.uploader.upload(image, {
    transformation: [
      { gravity: "face", height: 300, width: 200, crop: "crop" },
      { radius: "max" },
      { width: 150, crop: "scale" },
    ],
  });
  return result.secure_url;
}

export default uploadImage;
