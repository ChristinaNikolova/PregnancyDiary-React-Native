const cloudinary = require("../../config/cloudinary");

async function uploadImage(buffer, folder) {
    return await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(buffer);
    });
}

async function deleteImage(publicId) {
    return await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
    });
}

module.exports = { uploadImage, deleteImage };
