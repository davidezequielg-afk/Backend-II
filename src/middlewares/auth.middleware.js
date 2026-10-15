import { verifyToken } from '../utils/jwt.js';

export const authenticate = (req, res, next) => {
    const token = req.cookies.currentUser;
    const unauthenticatedError = () => {
        const err = new Error('No autenticado');
        err.statusCode = 401;
        return err;
    };
    if (!token) {
        return next(unauthenticatedError());
    }
    try {
        const user = verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        return next(unauthenticatedError());
    }
};