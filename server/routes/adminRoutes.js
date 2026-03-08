import { Router } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import verifyToken from '../middleware/auth.js';
import { login } from '../controllers/authController.js';
import {
  create as createProject, 
  update as updateProject, 
  remove as removeProject
} from '../controllers/projectController.js';
import { 
  fetch as fetchProfile,
  update as updateProfile
} from '../controllers/profileController.js';

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
  createProject
);

router.put('/projects/:id',
  verifyToken,
  upload.fields([{ name: 'thumbnail', maxCount: 2 }, { name: 'images' }]),
  processUploads,
  updateProject
);

router.delete('/projects/:id', verifyToken, removeProject);

/* 
Routes to get and edit user information
*/
router.get('/profile', verifyToken, fetchProfile)
router.put('/profile', verifyToken, updateProfile)

// router.post('/about-me', verifyToken, )


export default router;
