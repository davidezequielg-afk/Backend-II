export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;
    const message = statusCode === 500 ? 'Error interno del servidor' : err.message;
    res.status(statusCode).json({ status: 'error', message });
};