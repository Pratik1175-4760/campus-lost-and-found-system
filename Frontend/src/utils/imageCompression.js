import imageCompression from 'browser-image-compression';

export const compressImage = async (imageFile) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.8,
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    
    console.log('Original size:', (imageFile.size / 1024).toFixed(2), 'KB');
    console.log('Compressed size:', (compressedFile.size / 1024).toFixed(2), 'KB');
    
    return compressedFile;
  } catch (error) {
    console.error('Image compression error:', error);
    return imageFile; // Return original if compression fails
  }
};