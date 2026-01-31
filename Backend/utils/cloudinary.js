import { v2 as cloudinary } from "cloudinary";

// Configure once at startup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload from buffer (memory)
const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) {
      console.error("No file buffer provided");
      return null;
    }

    // Upload from buffer
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'lost-found',
          resource_type: 'auto',
          transformation: [
            { width: 1920, crop: 'limit' },
            { quality: 'auto:good' }
          ]
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("File uploaded successfully:", result.secure_url);
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