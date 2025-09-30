import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseConfig";

/**
 * Convert an image URL (e.g., /logo.png) to Base64 in the browser
 * @param {string} url 
 * @returns {Promise<string>} base64 string
 */
async function getBase64FromUrl(url) {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1]; // remove "data:image/png;base64,"
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Generate an image using Gemini API and save to Firebase
 * @param {string} prompt 
 * @returns {Promise<string>} Firebase download URL
 */
export default async function generateAndSaveImage(prompt) {
  try {
    // 1. Convert logo.png to base64
    const logoBase64 = await getBase64FromUrl("/logo.png");

    // 2. Call Gemini API
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const model = "gemini-2.5-flash-image-preview";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/png",
                data: logoBase64,
              },
            },
          ],
        },
      ],
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || "Gemini API request failed");
    }

    const result = await response.json();
    const base64Image = result?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Image) throw new Error("No image returned from Gemini API");

    // 3. Convert base64 -> Blob
    const byteString = atob(base64Image);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: "image/png" });

    // 4. Upload Blob -> Firebase
    const fileName = `ai-course/${Date.now()}.png`;
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, blob);

    // 5. Get Firebase URL
    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
  } catch (err) {
    console.error("Error in generateAndSaveImage:", err);
    throw err;
  }
}
