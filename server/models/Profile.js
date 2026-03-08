import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    campus: { type: String, required: true },
    location: { type: String, required: true },
    field: { type: String, required: true }, // e.g. Computer Science
    major: { type: String }, // e.g. Software Engineering
    result: { type: String }, // e.g. CGPA: 3.54
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String }
});

const profileSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aboutme: {
        type: String,
        required: true,
        default:
            "This is the about me section. You can edit this content to tell visitors more about yourself, your background, and your interests. Make it engaging and informative to give people a better sense of who you are!",
    },
    linkedin: { type: String, required: true },
    whatsapp: { type: String, required: true },
    education: [educationSchema]
});

export default mongoose.model("Profile", profileSchema);