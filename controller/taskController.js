import { Task } from '../models/taskModel.js';

export const getTasks = async (req, res) => {
    try { 
        const tasks = await Task.find({});
        res.status(200).json(tasks);


    }catch (err) {
        res.status(500).json({message: 'Kunde inte hämta uppgifter', err: err.message});
    }
};

export const createTask = async (req, res) => {
    try{
        const {title, user} = req.body;
        if(!title) {
            returnres.staus(400).json({message: 'Du måste ange en title för uppgiften'});
        }
        const newTask = await Task.create({
            title,
            user
        });
        res.status(200).json(newTask);

    } catch(err) {
        res.status(500).json({message: 'Kunde inte skapa uppgiften', error: err.message});

    }
};