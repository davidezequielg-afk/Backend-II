import express from 'express';
import eventsRoutes from './routes/api/events.router.js';
import sessionsRoutes from './routes/api/sessions.router.js';
import HealthStatus from './routes/api/health.router.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());


app.use('/api/health', HealthStatus);
app.use('/api/events', eventsRoutes);
app.use('/api/sessions', sessionsRoutes);

export default app;