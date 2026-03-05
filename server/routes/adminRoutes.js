import { Router } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import verifyToken from '../middleware/auth.js';
import { login } from '../controllers/authController.js';
import { create, update, remove } from '../controllers/projectController.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({}, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    });
    stream.end(buffer);
  });
};

const processUploads = async (req, res, next) => {
  try {
    // Ensure cloudinary is configured with latest env vars
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (req.files?.thumbnail?.length) {
      req.body.thumbnail = await Promise.all(
        req.files.thumbnail.map(f => uploadToCloudinary(f.buffer))
      );
    }

    if (req.files?.images?.length) {
      req.body.images = await Promise.all(
        req.files.images.map(f => uploadToCloudinary(f.buffer))
      );
    }

    // Parse links from JSON string if sent as text field
    if (req.body.links && typeof req.body.links === 'string') {
      req.body.links = JSON.parse(req.body.links);
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Upload failed: ' + err.message });
  }
};

router.post('/login', login);

router.post('/projects',
  verifyToken,
  upload.fields([{ name: 'thumbnail', maxCount: 2 }, { name: 'images' }]),
  processUploads,
  create
);

router.put('/projects/:id',
  verifyToken,
  upload.fields([{ name: 'thumbnail', maxCount: 2 }, { name: 'images' }]),
  processUploads,
  update
);

router.delete('/projects/:id', verifyToken, remove);

export default router;
