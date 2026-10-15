import userRepository from "../repositories/users.repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

const fail = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};


const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+[.][^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw fail(400, "Formato de email inválido");
    };
};
const validatePassword = (password) => {
    const minLengthPassword = 8;
    if (password.length < minLengthPassword) {
        throw fail(400, `La contraseña debe tener al menos ${minLengthPassword} caracteres`);
    };
};  


export const registerUser = async ({ email, password, first_name, last_name }) => {
    if (!email || !password || !first_name || !last_name) {
        throw fail(400, "Faltan campos obligatorios");
    };
    const normalizedEmail = email.trim().toLowerCase();

    validateEmail(normalizedEmail);
    validatePassword(password);
    
    const existingUser = await userRepository.findByEmail(normalizedEmail);
    if (existingUser) {
        throw fail(409, "El email ya está registrado");
    };
    const hashedPassword = await hashPassword(password);
    const newUser = {
        first_name,
        last_name,
        email: normalizedEmail,
        password: hashedPassword,
        role: 'user',
    };
    return await userRepository.create(newUser);
};  

export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw fail(400, "Faltan campos obligatorios");
    };
    const normalizedEmail = email.trim().toLowerCase();

    const user = await userRepository.findByEmail(normalizedEmail);
    if (!user) {
        throw fail(401, "Credenciales inválidas");
    };
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw fail(401, "Credenciales inválidas");
    };
    return { id: user._id, email: user.email, role: user.role };
};

export const getUserById = async (id) => {
    const user = await userRepository.findAll(id);
    if (!user) {
        throw fail(404, "Usuario no encontrado");
    };
    return { id: user._id, email: user.email, role: user.role };
};