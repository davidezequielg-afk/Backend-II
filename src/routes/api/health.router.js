import {  Router } from 'express';
import { HealthStatus } from '../../controllers/health.controller.js';

const routerHealth = Router();

routerHealth.get('/', HealthStatus);

export default routerHealth;