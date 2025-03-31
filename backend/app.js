 // Load environment variables
const express = require("express");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const incomeRoutes = require("./routes/incomeRoutes.js");
const cors = require('cors')
const app = express();
require("dotenv").config();

//middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
