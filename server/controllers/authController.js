import jwt from 'jsonwebtoken';
import Profile from '../models/Profile.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // look up user by email
    const user = await Profile.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // sign JWT with minimal payload
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
