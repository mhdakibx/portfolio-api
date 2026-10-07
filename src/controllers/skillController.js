import Skill from "../models/skill.js";


// Create Skill

export const createSkill = async (req, res) => {
    try {
        const {
            name,
            category,
            level,
            icon,
            order,
        } = req.body;

        if (!name || !category) {
            return res.status(400).json({
                message: "Name and category are required",
            });
        }

        const skill = await Skill.create({
            name,
            category,
            level,
            icon,
            order,
        });

        return res.status(201).json({
            message: "Skill created successfully",
            skill,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to create skill",
            error: error.message,
        });
    }
};


// Get All Skills

export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({
            order: 1,
            createdAt: -1,
        });

        return res.status(200).json({
            count: skills.length,
            skills,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get skills",
            error: error.message,
        });
    }
};


// Get Single Skill

export const getSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found",
            });
        }

        return res.status(200).json({
            skill,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get skill",
            error: error.message,
        });
    }
};


// Update Skill

export const updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found",
            });
        }

        const {
            name,
            category,
            level,
            icon,
            order,
        } = req.body;

        skill.name = name ?? skill.name;
        skill.category = category ?? skill.category;
        skill.level = level ?? skill.level;
        skill.icon = icon ?? skill.icon;
        skill.order = order ?? skill.order;

        const updatedSkill = await skill.save();

        return res.status(200).json({
            message: "Skill updated successfully",
            skill: updatedSkill,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update skill",
            error: error.message,
        });
    }
};


// Delete Skill

export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found",
            });
        }

        await skill.deleteOne();

        return res.status(200).json({
            message: "Skill deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete skill",
            error: error.message,
        });
    }
};