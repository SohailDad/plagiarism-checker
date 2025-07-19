const express = require("express");
const {getData, postData, putData, deleteData} = require("./controllers/crud")
const connectedDB = require("./config/db")
const app = express();
const port = 3000

app.use(express.json());
connectedDB()

app.get("/api",getData)
app.post("/api/insertdata",postData)
app.put("/api/updatedata",putData)
app.delete("/api/deletedata",deleteData)



app.listen(port,()=>{

    console.log(`Server is Running ${port}!!!`)
})