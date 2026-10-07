import { Router } from "express";

import {
    createSkill,
    getSkills,
    getSkill,
    updateSkill,
    deleteSkill,
} from "../controllers/skillController.js";

import {
    protect,
    adminOnly,
} from "../middleware/authMiddleware.js";

const router = Router();


// Public Routes

router.get("/", getSkills);

router.get("/:id", getSkill);


// Admin Routes

router.post(
    "/",
    protect,
    adminOnly,
    createSkill
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateSkill
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteSkill
);

export default router;