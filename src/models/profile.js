import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        bio: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        location: {
            type: String,
            trim: true,
        },

        github: {
            type: String,
            trim: true,
        },

        linkedin: {
            type: String,
            trim: true,
        },

        profileImage: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Profile", profileSchema);