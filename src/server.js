import app from './app.js';
import { connectionDB } from './config/config.database.js';
import { PORT } from './config/config.port.js';
import dotenv from 'dotenv';

dotenv.config();
const startServer = async () => {
  await connectionDB();


const port = PORT();
app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    })
};

startServer();