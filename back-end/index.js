const express = require("express");
const {getData, postData, putData, deleteData} = require("./controllers/crud")
const connectedDB = require("./config/db")
const Tesseract = require('tesseract.js');

const app = express();
const port = 3000

app.use(express.json());
connectedDB()

const path = require('path');

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

app.get("/api",getData)
app.post("/api/insertdata",postData)
app.put("/api/updatedata/:id",putData)
app.delete("/api/deletedata/:id",deleteData)


app.listen(port,()=>{

    console.log(`Server is Running ${port}!!!`)
})