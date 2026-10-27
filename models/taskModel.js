import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Du måste ange en titel för uppgiften"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "En uppgift måste tillhöra en användare"],
    },
  },
  {
    timestamps: true,
  },
);
export const Task = mongoose.model('Task', taskSchema);