import { findAllUsers } from "../repositories/users.repository.js";

export const getAllUsersController = async (req, res, next) => {
    try {
        const users = await findAllUsers();
        res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        next(error);
    }
};