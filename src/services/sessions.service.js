import { findUserByEmail, saveUser } from "../repositories/users.repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (userData) => {
  const {
    first_name,
    last_name,
    email,
    password
  } = userData;
  if (!first_name || !last_name || !email || !password) {
    const error = new Error("Faltan campos obligatorios");
    error.statusCode = 400;
    throw error;
  }
  const normalizedEmail = email.trim().toLowerCase();
  
  const minLengthPassword = 8;
  if (password.length < minLengthPassword) {
    const error = new Error(`La contraseña debe tener al menos ${minLengthPassword} caracteres`);
    error.statusCode = 400;
    throw error;


  };

  const emailRegex = /^[^\s@]+@[^\s@]+[.][^\s@]+$/;
if (!emailRegex.test(normalizedEmail)) {
  const error = new Error("Formato de email inválido");
  error.statusCode = 400;
  throw error;
}
  const existingUser = await findUserByEmail(normalizedEmail);
if (existingUser) {
  const error = new Error("El email ya está registrado");
  error.statusCode = 409;
  throw error;
};

  const hashedPassword = await hashPassword(password);
    const newUser = {
    first_name,
    last_name,
    email: normalizedEmail,
    password: hashedPassword,
};

const createdUser = await saveUser(newUser);

return {
    id: createdUser._id,
    first_name: createdUser.first_name,
    last_name: createdUser.last_name,
    email: createdUser.email,
    role: createdUser.role,
}
};


export const loginUser = async ( credentials ) => {
  const { email, password } = credentials;
if (!email || !password) {
  const error = new Error("Faltan campos obligatorios");
  error.statusCode = 400;
  throw error;
}
const normalizedEmail = email.trim().toLowerCase();
const user = await findUserByEmail(normalizedEmail);
if (!user) {
  const error = new Error("Credenciales inválidas");
  error.statusCode = 401;
  throw error;
}
const passwordMatch = await comparePassword(password, user.password);
if (!passwordMatch) {
  const error = new Error("Credenciales inválidas");
  error.statusCode = 401;
  throw error;
}
const payload = { id: user._id, email: user.email, role: user.role };
const token = generateToken(payload);
return { token };
};