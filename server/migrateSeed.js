import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import Profile from './models/Profile.js';
import bcrypt from 'bcryptjs';

async function seed() {
  await connectDB();

  // change these values as needed or read from env
  const name = process.env.ADMIN_NAME || 'Admin';
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const rawPassword = process.env.ADMIN_PASSWORD || 'password';

  // drop existing user with same email to avoid duplicates
  await Profile.deleteOne({ email });

  const password = await bcrypt.hash(rawPassword, 10);

  const aboutme = process.env.ADMIN_ABOUTME || undefined;
  const linkedin = process.env.ADMIN_LINKEDIN || '';
  const whatsapp = process.env.ADMIN_WHATSAPP || '';

  const user = new Profile({ _id: process.env.ADMIN_ID, name, email, password, aboutme, linkedin, whatsapp });
  await user.save();

  console.log('Seed user created:', email);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed', err);
  process.exit(1);
});
