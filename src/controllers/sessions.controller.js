import { registerUser, loginUser } from '../services/sessions.service.js';

export const registerController = async (req, res) => {
  try { const createdUser = await registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: createdUser });
  }
  catch (error) {
   res.status(error.statusCode || 500).json({ message: error.message || 'Error al registrar el usuario' });
  }
}
export const loginController = async (req, res) => {
  try {
  const { token } = await loginUser(req.body);
  res.status(200).json({ message: 'Inicio de sesión exitoso' });
  }
  catch (error) {
  res.status(error.statusCode || 500).json({ message: error.message || 'Error al iniciar sesión' });
  }
}