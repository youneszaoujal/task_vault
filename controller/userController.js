import { User } from '../models/usersModel.js';

export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.json({
            success: true,
            users: users
        });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Kunde inte hämta användare',
            error: error.message
        });

    }
};