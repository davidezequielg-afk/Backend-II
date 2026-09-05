import verifyToken from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.currentUser;
    if (!token) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    };
    const user = verifyToken(token);
    try {
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
};