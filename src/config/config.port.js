import { config } from 'dotenv';

config();

export const PORT = () => {
  try {
    const port = process.env.PORT || 3000;
    return port;
  } catch (error) {
    console.error('Error al obtener el puerto:', error);
    process.exit(1);
  }
}