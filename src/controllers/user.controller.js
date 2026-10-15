import { getAllUsers } from "../services/users.service.js";

export const getAllUsersController = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        next(error);
    }
};