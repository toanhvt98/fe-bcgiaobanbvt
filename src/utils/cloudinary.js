import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";
import axios from "axios";

export const cloudinaryUpload = async (image) => {
  if (!image) return "";
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const response = await axios({
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const imageUrl = response.data.secure_url;
    return imageUrl;
  } catch (error) {
    throw error;
  }
};

export async function uploadImagesToCloudinary(images) {
  try {
    // Tạo một mảng các Promise, mỗi Promise đại diện cho một ảnh đang được upload
    const uploadPromises = images.map(async (image) => {
      try {
        const url = await cloudinaryUpload(image);
        return url;
      } catch (error) {
        console.error('Failed to upload an individual image:', error);
        return null; // or throw error if you want to stop the whole process
      }
    });

    // Đợi tất cả các ảnh được upload và trả về mảng các URL
    const imageUrls = await Promise.all(uploadPromises);

    // Filter out any nulls (failed uploads)
    const validUrls = imageUrls.filter(url => url !== null);

    return validUrls;

  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
}