import { API_ENDPOINTS } from "./ApiEndPoints.js";
const CLOUDINARY_UPLOAD_PRESET = "moneymanager";
const uploadProfileImage = async (image) =>
{
    if (!image)
    {
        throw new Error("Please select a profile image");
    }
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    try {
        const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(
                data?.error?.message || "Image upload failed"
            );
        }
        console.log("Successfully uploaded image:", data);
        return data.secure_url;
    } catch (error) {
        console.error("Image upload error:", error.message);
        throw error;
    }
};

export default uploadProfileImage;
