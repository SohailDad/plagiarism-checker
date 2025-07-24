const fs = require("fs");
const path = require("path");
const { extractTextFromImage } = require("../utils/ocrUtil");
const { extractTextFromPDF } = require("../utils/pdfToTextUtil");
const { compareText } = require("../utils/plagiarismUtil");

exports.handleCheck = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded!" });
    console.log("Field data: ",file)

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
    // console.log("textContent: ",textContent);// for texting

    const referenceText = fs.readFileSync("reference_data/research.txt", "utf-8");

    const similarity = compareText(textContent, referenceText);
    console.log(`similarity: ${similarity}`)// f
    res.json({ similarity: `${similarity}%` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.checkUserText = async(req,res)=>{
  try {
    const userText = req.body.userText
    console.log("usertext: ",userText)
    if(!userText) return res.status(400).json({message: "No any text sumbit!!"})

    const referenceText = fs.readFileSync("reference_data/research.txt","utf-8");
    
    const similarity = compareText(userText,referenceText);

    console.log(`similarity: ${similarity}%`) //for testing 
    res.status(200).json({similarity: `${similarity}%`})


  } catch (error) {
      console.error(error);
    res.status(500).json({ message: "Server error." });
  }

};
