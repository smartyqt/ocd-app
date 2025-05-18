// firebase/uploadPhoto.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export const uploadPhoto = async (uri) => {
  try {
    // Convert the local image URI to a blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create a storage reference
    const fileName = `photos/${Date.now()}.jpg`;
    const photoRef = ref(storage, fileName);

    // Upload the blob
    await uploadBytes(photoRef, blob);

    // Get the download URL
    const downloadURL = await getDownloadURL(photoRef);
    return downloadURL;
  } catch (err) {
    console.error("🔥 uploadPhoto error:", err);
    throw err;
  }
};