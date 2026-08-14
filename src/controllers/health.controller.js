export const HealthStatus = (req, res) => {
  res.status(200).json({ "status": "ok", "message": "Servidor activo" });
};