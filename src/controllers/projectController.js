import Project from "../models/project.js";
import uploadFile from "../services/storage.services.js";

// Parse technologies into an array
const parseTechnologies = (value) => {
    if (Array.isArray(value)) {
        return value
            .flat(Infinity)
            .map((item) => String(item).trim())
            .filter(Boolean);
    }

    if (value === undefined || value === null || value === "") {
        return [];
    }

    if (typeof value !== "string") {
        return [];
    }

    const text = value.trim();

    if (!text) {
        return [];
    }

    // Handle JSON array string
    try {
        const parsed = JSON.parse(text);

        if (Array.isArray(parsed)) {
            return parseTechnologies(parsed);
        }

        if (typeof parsed === "string" && parsed !== text) {
            return parseTechnologies(parsed);
        }
    } catch {
        // Handle comma-separated values below
    }

    return text
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
};

// Parse boolean values from FormData
const parseBoolean = (value) => {
    if (typeof value === "boolean") {
        return value;
    }

    return String(value).toLowerCase() === "true";
};


// ========================================
// Create Project
// POST /api/projects
// ========================================
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

        if (!title?.trim() || !description?.trim()) {
            return res.status(400).json({
                message: "Title and description are required",
            });
        }

        let imageUrl = "";

        // Upload image to ImageKit
        if (req.file) {
            const result = await uploadFile(
                req.file.buffer,
                req.file.originalname,
                "/portfolio/projects"
            );

            imageUrl = result.url;
        }

        const project = await Project.create({
            title: title.trim(),
            description: description.trim(),
            image: imageUrl,
            technologies: parseTechnologies(technologies),
            githubUrl: githubUrl || "",
            liveUrl: liveUrl || "",
            featured: parseBoolean(featured),
        });

        return res.status(201).json({
            message: "Project created successfully",
            project,
        });

    } catch (error) {
        console.error("Create project error:", error);

        return res.status(500).json({
            message: "Failed to create project",
            error: error.message,
        });
    }
};


// ========================================
// Get All Projects
// GET /api/projects
// ========================================
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
        console.error("Get projects error:", error);

        return res.status(500).json({
            message: "Failed to get projects",
            error: error.message,
        });
    }
};


// ========================================
// Get Single Project
// GET /api/projects/:id
// ========================================
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
        console.error("Get project error:", error);

        return res.status(500).json({
            message: "Failed to get project",
            error: error.message,
        });
    }
};


// ========================================
// Update Project
// PUT /api/projects/:id
// ========================================
export const updateProject = async (req, res) => {
    try {
        const {
            title,
            description,
            technologies,
            githubUrl,
            liveUrl,
            featured,
        } = req.body;

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        // Replace image when a new image is uploaded
        if (req.file) {
            const result = await uploadFile(
                req.file.buffer,
                req.file.originalname,
                "/portfolio/projects"
            );

            project.image = result.url;
        }

        // Update only provided fields
        if (title !== undefined) {
            project.title = title.trim();
        }

        if (description !== undefined) {
            project.description = description.trim();
        }

        if (technologies !== undefined) {
            project.technologies = parseTechnologies(technologies);
        }

        if (githubUrl !== undefined) {
            project.githubUrl = githubUrl;
        }

        if (liveUrl !== undefined) {
            project.liveUrl = liveUrl;
        }

        if (featured !== undefined) {
            project.featured = parseBoolean(featured);
        }

        const updatedProject = await project.save();

        return res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject,
        });

    } catch (error) {
        console.error("Update project error:", error);

        return res.status(500).json({
            message: "Failed to update project",
            error: error.message,
        });
    }
};


// ========================================
// Delete Project
// DELETE /api/projects/:id
// ========================================
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
        console.error("Delete project error:", error);

        return res.status(500).json({
            message: "Failed to delete project",
            error: error.message,
        });
    }
};