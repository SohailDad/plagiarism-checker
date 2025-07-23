const express = require("express");
const app = express();
const checkRoutes = require("./routes/checkRoutes");

require("dotenv").config();
app.use(express.json());
app.use("/check", checkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
