import { UserDTO } from "../dto/user.dto.js";
import { getAllUsers } from "../services/users.service.js";

export const getAllUsersController = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        const usersDTO = users.map(user => new UserDTO(user));
        res.status(200).json({ status: 'success', payload: usersDTO });
    } catch (error) {
        next(error);
    }
};