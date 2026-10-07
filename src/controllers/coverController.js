import Cover from "../models/cover.js";
import uploadFile from "../services/storage.services.js";


// Get Active Cover

export const getCover = async (req, res) => {
    try {
        const cover = await Cover.findOne({
            isActive: true,
        }).sort({
            createdAt: -1,
        });

        if (!cover) {
            return res.status(404).json({
                message: "Active cover not found",
            });
        }

        return res.status(200).json({
            cover,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get cover",
            error: error.message,
        });
    }
};


// Create Cover

export const createCover = async (req, res) => {
    try {
        const {
            title,
            description,
            isActive,
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Cover image is required",
            });
        }

        const result = await uploadFile(
            req.file.buffer,
            req.file.originalname,
            "/portfolio/covers"
        );

        const imageUrl = result.url;


        // If new cover is active,
        // deactivate previous covers

        if (isActive === "true" || isActive === true) {
            await Cover.updateMany(
                {},
                {
                    isActive: false,
                }
            );
        }


        const cover = await Cover.create({
            image: imageUrl,
            title,
            description,
            isActive:
                isActive === "false" ? false : true,
        });


        return res.status(201).json({
            message: "Cover created successfully",
            cover,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to create cover",
            error: error.message,
        });
    }
};


// Update Cover

export const updateCover = async (req, res) => {
    try {
        const cover = await Cover.findById(req.params.id);

        if (!cover) {
            return res.status(404).json({
                message: "Cover not found",
            });
        }

        const {
            title,
            description,
            isActive,
        } = req.body;


        // Upload new image if provided

        if (req.file) {
            const result = await uploadFile(
                req.file.buffer,
                req.file.originalname,
                "/portfolio/covers"
            );

            cover.image = result.url;
        }


        // If this cover becomes active,
        // deactivate other covers

        if (isActive === "true" || isActive === true) {
            await Cover.updateMany(
                {
                    _id: {
                        $ne: cover._id,
                    },
                },
                {
                    isActive: false,
                }
            );
        }


        cover.title = title ?? cover.title;
        cover.description = description ?? cover.description;

        if (isActive !== undefined) {
            cover.isActive =
                isActive === "true" || isActive === true;
        }


        const updatedCover = await cover.save();


        return res.status(200).json({
            message: "Cover updated successfully",
            cover: updatedCover,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update cover",
            error: error.message,
        });
    }
};


// Delete Cover

export const deleteCover = async (req, res) => {
    try {
        const cover = await Cover.findById(req.params.id);

        if (!cover) {
            return res.status(404).json({
                message: "Cover not found",
            });
        }

        await cover.deleteOne();

        return res.status(200).json({
            message: "Cover deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete cover",
            error: error.message,
        });
    }
};