import cloudinary from 'cloudinary';

cloudinary.v2.config({
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
  // TO DO: Check why cloudinary upload is not working with env variables, hardcoding for now
  cloud_name: "dfqddfqma",
  api_key: "936257765873736",
  api_secret: "dA9gWLTU7RknbnfZ0mFB97vpnlI",
});

export default cloudinary.v2;
