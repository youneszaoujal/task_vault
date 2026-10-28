import { Task } from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Kunde inte hämta uppgifter", err: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, user } = req.body;
    if (!title) {
      returnres
        .staus(400)
        .json({ message: "Du måste ange en title för uppgiften" });
    }
    const newTask = await Task.create({
      title,
      user,
    });
    res.status(200).json(newTask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Kunde inte skapa uppgiften", error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Upgiften hittades inte" });
    }
    res.status(200).json(task);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Kunde inte hämta uppgiften", err: err.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateTask) {
      return res.status(404).json({ message: "Uppgiften hittade inte" });
    }
    res.status(200).json(updateTask);
  } catch (err) {
    res.status(400).json({ message: "kunde inte uppdatera uppgiften" });
  }
};
export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        if(!deletedTask) {
            return res.status(404).json({message: "Uppgiften hittades inte"})
        }
        res.status(200).json({message: "Uppgiften har raderats"})
    } catch (err) {
        res.status(400).json({message: "Kunde4 inte radera uppgiften"})
    }
};