import { Router } from "express";

import {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile,
} from "../controllers/profileController.js";

import {
    protect,
    adminOnly,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";


const router = Router();


// Public Route
router.get(
    "/",
    getProfile
);


// Admin Routes
router.post(
    "/",
    protect,
    adminOnly,
    upload.single("profileImage"),
    createProfile
);

router.put(
    "/:id",
    protect,
    adminOnly,
    upload.single("profileImage"),
    updateProfile
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteProfile
);


export default router;