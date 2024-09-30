import { Router } from 'express';
import { errorHandler } from '../error-handler';

import adminMiddleware from '../middlewares/admin';
import authMiddleware from '../middlewares/auth';
import { createCajaLote, getCajaLote } from '../controllers/cajaLote';

const cajaLoteRoutes: Router = Router();

cajaLoteRoutes.get('/', [authMiddleware], errorHandler(getCajaLote));
cajaLoteRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createCajaLote));

export default cajaLoteRoutes;
