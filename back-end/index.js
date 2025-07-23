const express = require("express");
const Tesseract = require('tesseract.js');
const path = require('path');

const app = express();
const port = 3000

app.use(express.json());


const imagePath = path.join(__dirname, '..', 'project_related_data', 'image.png');

Tesseract.recognize(
  imagePath,
  'eng', // Language: 'eng' for English
//   {
//     logger: (m) => console.log(m), // Optional: shows progress in console
//   }
).then((imagText) => {
  console.log("Extracted Text:\n", imagText.data.text);
}).catch((error) => {
  console.error("OCR Error:", error);
})




app.listen(port,()=>{

    console.log(`Server is Running ${port}!!!`)
})