import { v2 as cloudinary } from "cloudinary";

const uploadOnCloudinary = async (fileBuffer) => {
  try {
    // ✅ Config INSIDE function
    // This runs when upload is called, NOT when file loads
    // By this time, dotenv.config() has already run
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!fileBuffer) {
      console.error("No file buffer provided");
      return null;
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "lost-found",
          resource_type: "auto",
          transformation: [
            { width: 1920, crop: "limit" },
            { quality: "auto:good" },
          ],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("Uploaded successfully:", result.secure_url);
            resolve(result);
          }
        }
      );

      uploadStream.end(fileBuffer);
    });

    return result;
  } catch (error) {
    console.error("Upload failed:", error.message);
    return null;
  }
};

export { uploadOnCloudinary };