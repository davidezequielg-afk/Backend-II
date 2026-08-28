import { createUser, getUserByEmail } from "../dao/users.dao.js";

export const findUserByEmail = async (email) => {
    return await getUserByEmail(email);
};

export const saveUser = async (userData) => {
    return await createUser(userData);
};
