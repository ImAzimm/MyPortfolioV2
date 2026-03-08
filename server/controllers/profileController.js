import Profile from "../models/Profile.js";

export const create = async (req, res) => {
    try {
        const profile = new Profile(req.body);
        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const fetch = async (req, res) => {
    try {
        // const profile = await Profile.findById(req.user.id).select('-password');
        const profile = await Profile.findById(process.env.ADMIN_ID).select('-password');
        if (!profile) return res.status(404).json({ message: 'User not found' });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const user = await Profile.findByIdAndUpdate(process.env.ADMIN_ID, req.body, { new: true, runValidators: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};