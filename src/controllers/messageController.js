import Message from "../models/message.js";


// Create Message
// Public

export const createMessage = async (req, res) => {
    try {
        const {
            name,
            email,
            subject,
            message,
        } = req.body;


        if (!name || !email || !message) {
            return res.status(400).json({
                message: "Name, email and message are required",
            });
        }


        const newMessage = await Message.create({
            name,
            email,
            subject,
            message,
        });


        return res.status(201).json({
            message: "Message sent successfully",
            data: newMessage,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to send message",
            error: error.message,
        });
    }
};


// Get All Messages
// Admin

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({
            createdAt: -1,
        });


        return res.status(200).json({
            count: messages.length,
            messages,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get messages",
            error: error.message,
        });
    }
};


// Get Single Message
// Admin

export const getMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);


        if (!message) {
            return res.status(404).json({
                message: "Message not found",
            });
        }


        return res.status(200).json({
            message,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get message",
            error: error.message,
        });
    }
};


// Mark Message As Read / Unread
// Admin

export const updateMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);


        if (!message) {
            return res.status(404).json({
                message: "Message not found",
            });
        }


        const { isRead } = req.body;


        if (isRead !== undefined) {
            message.isRead = isRead;
        }


        const updatedMessage = await message.save();


        return res.status(200).json({
            message: "Message updated successfully",
            data: updatedMessage,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update message",
            error: error.message,
        });
    }
};


// Delete Message
// Admin

export const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);


        if (!message) {
            return res.status(404).json({
                message: "Message not found",
            });
        }


        await message.deleteOne();


        return res.status(200).json({
            message: "Message deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete message",
            error: error.message,
        });
    }
};