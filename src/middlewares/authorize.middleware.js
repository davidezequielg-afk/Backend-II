export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        const unauthorizedError = () => {
            const err = new Error('No tenés permisos para realizar esta acción');
            err.statusCode = 403;
            return err;
        };
        if (!allowedRoles.includes(req.user.role)) {
            return next(unauthorizedError());
        }
        next();
    };
};