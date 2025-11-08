import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "./config/config.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.SERVER_PORT || 2001;
const app = express();

app.use(
  cors({
    origin: ["https://mern-thinkboard-frontend-embb.onrender.com"],
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/v1/notes", notesRoutes);
app.use("/*", (req, res) => res.status(404).send("Page not found"));

mongoose.Promise = Promise;
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" }) //, {retryWrites:true,w:'majority'}
  .then(() => {
    console.log("Connected to Mongo DB successfully");
    app.listen(PORT, () => {
      console.log(`Server Running  at 👉 http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Couldn't connect to Mongo DB: ", err);
    process.exit(1);
  });
