import { registerUser } from '../services/sessions.service.js';

export const registerController = async (req, res) => {
  try { const createdUser = await registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: createdUser });
  }
  catch (error) {
   res.status(error.statusCode || 500).json({ message: error.message || 'Error al registrar el usuario' });
  }
}
