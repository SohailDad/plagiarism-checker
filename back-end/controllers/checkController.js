const fs = require("fs");
const path = require("path");
const { extractTextFromImage } = require("../utils/ocrUtil");
const { extractTextFromPDF } = require("../utils/pdfToTextUtil");
const { compareText } = require("../utils/plagiarismUtil");

exports.handleCheck = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded!" });

    let textContent = "";

    if (file.mimetype === "application/pdf") {
      textContent = await extractTextFromPDF(file.path);
    } else if (file.mimetype.startsWith("image/")) {
      textContent = await extractTextFromImage(file.path);
    } else if (file.mimetype === "text/plain") {
      textContent = fs.readFileSync(file.path, "utf-8");
    } else {
      return res.status(400).json({ message: "Unsupported file type." });
    }

    const referenceText = fs.readFileSync("reference_data/research.txt", "utf-8");

    const similarity = compareText(textContent, referenceText);
    res.json({ similarity: `${similarity}%` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
