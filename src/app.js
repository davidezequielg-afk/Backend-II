import express from 'express';
import eventsRoutes from './routes/api/events.router.js';
import sessionsRoutes from './routes/api/sessions.router.js';
import HealthStatus from './routes/api/health.router.js';

const app = express();

app.use(express.json());

app.use('/api/health', HealthStatus);
app.use('/api/events', eventsRoutes);
app.use('/api/sessions', sessionsRoutes);

export default app;