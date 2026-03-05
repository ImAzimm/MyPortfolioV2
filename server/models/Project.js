import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url:   { type: String, required: true },
}, { _id: false });

const projectSchema = new mongoose.Schema({
  title:      { type: String, required: true, trim: true },
  desc:       { type: String, required: true, trim: true },
  type:       { type: String, required: true, enum: ['Course Project', 'Hobby', 'PEKOM Events'] },
  thumbnail:  { type: [String], required: true, validate: v => v.length >= 1 },
  images:     { type: [String], required: true, validate: v => v.length >= 1 },
  links:      { type: [linkSchema], required: false, validate: v => v.length >= 0},
  createdAt:  { type: Date, default: Date.now },
  updatedAt:  { type: Date, default: Date.now },
});

export default mongoose.model('Project', projectSchema);
