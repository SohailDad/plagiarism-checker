const tesseract = require("tesseract.js");

exports.extractTextFromImage = async (imagePath) => {
  const result = await tesseract.recognize(imagePath, 'eng');
  return result.data.text;
};
