import { verifyToken } from '../utils/jwt.js';

export const authenticate = (req, res, next) => {
    const token = req.cookies.currentUser;

    if (!token) {
        return res.status(401).json({ 
            status: 'error', 
            message: 'No autenticado' 
        });
    }
    try {
        const user = verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ 
            status: 'error', 
            message: 'No autenticado' 
        });
    }
};