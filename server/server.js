import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/projects', publicRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
