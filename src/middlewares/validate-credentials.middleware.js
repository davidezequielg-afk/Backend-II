export const validateCredentials = (req, res, next) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        const error = new Error('Faltan campos obligatorios');
        error.statusCode = 400;
        return next(error);
    }
    next();
};