const mongoose = require("mongoose")
const url =  "mongodb://localhost:27017/testingCRUDinternship"

const connectedDB = async()=>{

    try {
       const connectDB =  await mongoose.connect(url)
        if (connectDB) {
            console.log("Database is Connected.!!!")
        }

    } catch (error) {
        console.error("DB Error: ",error)
    }


}

module.exports = connectedDB