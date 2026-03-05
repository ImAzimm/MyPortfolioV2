import cloudinary from 'cloudinary';

// Configure cloudinary with environment variables
const configureCloudinary = () => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

// Configure on import and when needed
configureCloudinary();

export default cloudinary.v2;
