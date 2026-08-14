import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Base de datos conectada correctamente');
  } catch (error) {
    console.error('Error de conexión con la base de datos:', error);
    process.exit(1);
  }
};