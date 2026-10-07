import { Router } from "express";

import {
    getCover,
    createCover,
    updateCover,
    deleteCover,
} from "../controllers/coverController.js";

import {
    protect,
    adminOnly,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = Router();


// Public Route

router.get("/", getCover);


// Admin Routes

router.post(
    "/",
    protect,
    adminOnly,
    upload.single("image"),
    createCover
);

router.put(
    "/:id",
    protect,
    adminOnly,
    upload.single("image"),
    updateCover
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteCover
);

export default router;