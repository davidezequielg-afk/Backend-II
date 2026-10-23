import passport from 'passport';

export const authenticate = (req, res, next) => {
    passport.authenticate('current', { session: false },
(err, user, info) => {
        if (err) {
            const error = new Error('No autenticado');
            error.statusCode = 401;
            return next(error);
        }
        req.user = user;
        if (!user) {
            const error = new Error('No autenticado');
            error.statusCode = 401;
            return next(error);
        }
        next();
    }
    )(req, res, next);
};