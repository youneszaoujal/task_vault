import express from "express";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
    deleteTask,
} from "../controller/taskController.js";

const router = express.Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

export default router;
