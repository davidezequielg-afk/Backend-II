export const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || err.status || 500;
    let message = err.message;
    if (err.name === 'ValidationError' || err.name === 'CastError') {
        statusCode = 400;
        message = 'Datos inválidos';
    }
    if (err.code === 11000) {
        statusCode = 409;
        message = 'El registro ya existe';
    }
    if (statusCode === 500) {
        message = 'Error interno del servidor';
    }
    res.status(statusCode).json({ status: 'error', message });
};