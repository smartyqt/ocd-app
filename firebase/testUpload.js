import { storage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const testStorageUpload = async () => {
  try {
    const testContent = "This is a test file for Firebase Storage";
    const blob = new Blob([testContent], { type: 'text/plain' });

    const testFileName = `test-${Date.now()}.txt`;
    const fileRef = ref(storage, testFileName);

    const uploadResult = await uploadBytes(fileRef, blob);
    const downloadURL = await getDownloadURL(fileRef);

    return {
      success: true,
      message: "Test upload successful",
      downloadURL
    };
  } catch (error) {
    return {
      success: false,
      message: `Test upload failed: ${error.message}`,
      error
    };
  }
};