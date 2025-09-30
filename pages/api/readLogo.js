import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "public", "logo.png");
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = imageBuffer.toString("base64");

    res.status(200).json({
      mimeType: "image/png",
      data: base64Image,
    });
  } catch (err) {
    console.error("Error reading logo:", err);
    res.status(500).json({ error: "Failed to load logo" });
  }
}
