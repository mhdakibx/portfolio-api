import mongoose from "mongoose";

const coverSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },

        title: {
            type: String,
        },

        description: {
            type: String,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Cover", coverSchema);