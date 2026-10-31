import { Task } from "../models/taskModel.js";
import mongoose from 'mongoose';

export const getTasks = async (req, res) => {
  try {
    const filter = { user: req.userId };

    // 2. Om användaren skickar med ?search=sökord i URL:en, lägg till det i filtret
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: 'i' }; // 'i' = oberoende av stora/små bokstäver
    }
    const tasks = await Task.find({ filter }).populate('user', 'username email');
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
      return
        res.status(400)
        .json({ message: "Du måste ange en title för uppgiften" });
    }
    const newTask = await Task.create({
      title,
      user: req.userId
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
   
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
    { returnDocument: 'after', runValidators: true }
    );

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
    // Letar efter task med rätt ID OCH kollar att den tillhör inloggad användare
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Uppgiften hittades inte eller så saknar du behörighet" });
    }
    
    res.status(200).json({ message: "Uppgiften har raderats" });
  } catch (err) {
    res.status(400).json({ message: "Kunde inte radera uppgiften", error: err.message });
  }
};