import express from 'express';
import passport from 'passport';

import HealthStatus from './routes/api/health.router.js';
import eventsRoutes from './routes/api/events.router.js';
import sessionsRoutes from './routes/api/sessions.router.js';
import routerUser from './routes/api/users.router.js';
import cookieParser from 'cookie-parser';



import './config/passport.config.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/health', HealthStatus);
app.use('/api/events', eventsRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/users', routerUser);

app.use(errorMiddleware);

export default app;