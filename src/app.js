import express from 'express';
import passport from 'passport';

import eventsRoutes from './routes/api/events.router.js';
import sessionsRoutes from './routes/api/sessions.router.js';
import HealthStatus from './routes/api/health.router.js';
import cookieParser from 'cookie-parser';



import './config/passport.config.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('register', registerStrategy);
app.use('login', loginStrategy);
app.use(passport.initialize());

app.use('/api/health', HealthStatus);
app.use('/api/events', eventsRoutes);
app.use('/api/sessions', sessionsRoutes);

app.use(errorMiddleware);

export default app;