import { NODE_ENV } from '../config/config.jwt.js';
import { JWT_EXPIRES_IN } from '../config/config.jwt.js';
import { generateToken } from '../utils/jwt.js';

export const registerController = async (req, res) => {
  res.status(201).json({ 
    message: 'Usuario registrado exitosamente', 
    user: req.user });
};


export const loginController = async (req, res) => {
  const token  = generateToken(req.user);
  res.cookie("currentUser", token, {
    httpOnly: true,
    maxAge: JWT_EXPIRES_IN, 
    sameSite:"lax",
    secure: NODE_ENV === "production"
  });
  res.status(200).json({ message: 'Inicio de sesión exitoso' });
}


export const logoutController = (req, res) => {
  res.clearCookie("currentUser", {
    httpOnly: true,
    sameSite:"lax",
    secure: NODE_ENV === "production"
  });
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
}

export const currentUserController = (req, res) => {
  if (req.user) {
    res.status(200).json({ user: { id: req.user.id, email: req.user.email, role: req.user.role } });
  } else {
    res.status(401).json({ message: 'Usuario no autenticado' });
  }
};