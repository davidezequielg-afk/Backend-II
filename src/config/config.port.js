import { config } from 'dotenv';

config();

export const PORT = () => {
  try {
    const port = process.env.PORT || process.env.PORT;
    return port;
  } catch (error) {
    console.error('Error al obtener el puerto:', error);
    process.exit(1);
  }
}