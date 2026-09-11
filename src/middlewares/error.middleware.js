
export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;
    const message = err.statusCode ? err.message : err.statusCode === 401 ? 'Usuario no autenticado' : err.message || 'Error interno del servidor';
    res.status(statusCode).json({ message });
}