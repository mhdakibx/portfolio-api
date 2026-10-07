import { Router } from "express";

import {
    createMessage,
    getMessages,
    getMessage,
    updateMessage,
    deleteMessage,
} from "../controllers/messageController.js";

import {
    protect,
    adminOnly,
} from "../middleware/authMiddleware.js";

const router = Router();


// Public Route
router.post(
    "/",
    createMessage
);


// Admin Routes
router.get(
    "/",
    protect,
    adminOnly,
    getMessages
);

router.get(
    "/:id",
    protect,
    adminOnly,
    getMessage
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateMessage
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteMessage
);


export default router;