import { ImageKit } from "@imagekit/nodejs";
import config from "../../config/config.js";

const imagekit = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

const uploadFile = async (buffer, fileName, folder) => {
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: fileName,
        folder: folder,
    });

    return result;
};

export default uploadFile;