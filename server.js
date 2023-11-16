import "dotenv/config";
import express from "express";
import urlRouter from "./routes/url.js";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";

connectDb();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRouter);
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
