import { Router } from "express";

import {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
} from "../controllers/projectController.js";

import {
    protect,
    adminOnly,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = Router();


// Public Routes

router.get("/", getProjects);

router.get("/:id", getProject);


// Admin Routes

router.post(
    "/",
    protect,
    adminOnly,
    upload.single("image"),
    createProject
);

router.put(
    "/:id",
    protect,
    adminOnly,
    upload.single("image"),
    updateProject
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteProject
);

export default router;