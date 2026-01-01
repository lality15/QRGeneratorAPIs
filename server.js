const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const storeRoutes = require("./routes/store");


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/store", storeRoutes);
app.use("/api/auth", require("./routes/auth"));
app.use("/api/dashboard", require("./routes/dashboard"));


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
