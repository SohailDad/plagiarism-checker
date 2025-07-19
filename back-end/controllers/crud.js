const userDetail = require("../models/userSchema")

const getData = async (req, res) => {

    try {

        const getUsers = await userDetail.find()

        if (getUsers.length === 0) {
            return res.status(404).json({ message: "No users found!" });
        }
        res.status(200).json( getUsers )

    } catch (error) {
        console.error("interval server error: ", error);
        res.status(500).json({ message: "Internal server error." });
    }


}

const postData = async (req, res) => {
    try {
        const insertUser = req.body;
        // console.log(insertUser); for testing

        if (!insertUser.name || !insertUser.email || !insertUser.password) {
            return res.status(400).json({ message: "Please fill all required fields!" });
        }

        await userDetail.create(insertUser);

        res.status(200).json({ message: "User successfully inserted!" });

    } catch (error) {
        console.error("interval server error: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


const putData = async (req, res) => {

    const id = req.params.id;
    const updateUser = req.body

    // console.log("upadted user Data: ",id,updateUser) //for testing 
     if (!updateUser.name || !updateUser.email || !updateUser.password || !id) {
            return res.status(400).json({ message: "Please fill all required fields!" });
        }


    try {
        
       const updatedUser =  await userDetail.findByIdAndUpdate(id,updateUser,{ new: true })

       res.status(200).json({message:"User successfully updated!",data: updatedUser})

    } catch (error) {
        console.error("interval server error: ", error);
        res.status(500).json({ message: "Internal server error." });

    }


}

const deleteData = async (req, res) => {




}


module.exports = { getData, postData, putData, deleteData }