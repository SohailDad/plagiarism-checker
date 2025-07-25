const express = require("express");
const app = express();
const checkRoutes = require("./routes/checkRoutes");

require("dotenv").config();
app.use(express.json());
app.use("/filecheck", checkRoutes);
app.use("/textcheck", checkRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


