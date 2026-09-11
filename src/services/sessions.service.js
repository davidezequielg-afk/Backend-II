import { findUserByEmail, saveUser } from "../repositories/users.repository.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";



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