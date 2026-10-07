import Profile from "../models/profile.js";
import uploadFile from "../services/storage.services.js";


// Create Profile
// Admin

export const createProfile = async (req, res) => {
    try {
        const {
            name,
            title,
            bio,
            email,
            phone,
            location,
            github,
            linkedin,
        } = req.body;


        if (!name || !title || !bio || !email) {
            return res.status(400).json({
                message: "Name, title, bio and email are required",
            });
        }


        const existingProfile = await Profile.findOne();

        if (existingProfile) {
            return res.status(400).json({
                message: "Profile already exists",
            });
        }


        let profileImage = "";

        if (req.file) {
            const result = await uploadFile(
                req.file.buffer,
                req.file.originalname,
                "/portfolio/profile"
            );

            profileImage = result.url;
        }


        const profile = await Profile.create({
            name,
            title,
            bio,
            email,
            phone,
            location,
            github,
            linkedin,
            profileImage,
        });


        return res.status(201).json({
            message: "Profile created successfully",
            profile,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to create profile",
            error: error.message,
        });
    }
};


// Get Profile
// Public

export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }


        return res.status(200).json({
            profile,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get profile",
            error: error.message,
        });
    }
};


// Update Profile
// Admin

export const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }


        const {
            name,
            title,
            bio,
            email,
            phone,
            location,
            github,
            linkedin,
        } = req.body;


        if (req.file) {
            const result = await uploadFile(
                req.file.buffer,
                req.file.originalname,
                "/portfolio/profile"
            );

            profile.profileImage = result.url;
        }


        profile.name = name ?? profile.name;
        profile.title = title ?? profile.title;
        profile.bio = bio ?? profile.bio;
        profile.email = email ?? profile.email;
        profile.phone = phone ?? profile.phone;
        profile.location = location ?? profile.location;
        profile.github = github ?? profile.github;
        profile.linkedin = linkedin ?? profile.linkedin;


        const updatedProfile = await profile.save();


        return res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedProfile,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update profile",
            error: error.message,
        });
    }
};


// Delete Profile
// Admin

export const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }


        await profile.deleteOne();


        return res.status(200).json({
            message: "Profile deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete profile",
            error: error.message,
        });
    }
};