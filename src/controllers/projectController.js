import Project from "../models/Project.js";
import uploadFile from "../services/storage.services.js";


// Create Project

export const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            technologies,
            githubUrl,
            liveUrl,
            featured,
        } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required",
            });
        }

        let imageUrl = "";

        if (req.file) {
            const result = await uploadFile(
                req.file.buffer,
                req.file.originalname,
                "/portfolio/projects"
            );

            imageUrl = result.url;
        }

        const project = await Project.create({
            title,
            description,
            image: imageUrl,
            technologies,
            githubUrl,
            liveUrl,
            featured,
        });

        return res.status(201).json({
            message: "Project created successfully",
            project,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to create project",
            error: error.message,
        });
    }
};


// Get All Projects

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({
            createdAt: -1,
        });

        return res.status(200).json({
            count: projects.length,
            projects,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get projects",
            error: error.message,
        });
    }
};


// Get Single Project

export const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        return res.status(200).json({
            project,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get project",
            error: error.message,
        });
    }
};


// Update Project

export const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        const {
            title,
            description,
            technologies,
            githubUrl,
            liveUrl,
            featured,
        } = req.body;


        if (req.file) {
            const result = await uploadFile(
                req.file.buffer,
                req.file.originalname,
                "/portfolio/projects"
            );

            project.image = result.url;
        }


        project.title = title ?? project.title;
        project.description = description ?? project.description;
        project.technologies = technologies ?? project.technologies;
        project.githubUrl = githubUrl ?? project.githubUrl;
        project.liveUrl = liveUrl ?? project.liveUrl;
        project.featured = featured ?? project.featured;


        const updatedProject = await project.save();

        return res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update project",
            error: error.message,
        });
    }
};


// Delete Project

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        await project.deleteOne();

        return res.status(200).json({
            message: "Project deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete project",
            error: error.message,
        });
    }
};