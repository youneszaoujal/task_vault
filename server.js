import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Task Vault API fungerar som den ska!" });
});

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Ansluten till MongoDB!");
} catch (err) {
  console.error("kunde inte ansluta till MongoDB:", err);
}

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});

const gracefulShutdown = async (signal) => {
  console.log(`\nMottog ${signal}. Stänger MongoDB-anslutningen...`);
  try {
    await mongoose.connection.close();
    console.log("MongoDB-anslutningen har stängts korrekt.");
    process.exit(0); // Avslutar applikationen utan fel
  } catch (error) {
    console.error("Fel vid stängning av MongoDB:", error);
    process.exit(1);
  }
};

// Lyssna på när du trycker Ctrl+C i terminalen
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Lyssna på när nod-processen dödas eller startas om av Nodemon
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
