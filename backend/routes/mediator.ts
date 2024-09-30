import { Router } from 'express';
import { errorHandler } from '../error-handler';

import adminMiddleware from '../middlewares/admin';
import authMiddleware from '../middlewares/auth';
import {
   getMediators,
   createMediator,
   getMediatorById,
   updateMediator,
   deleteMediator,
   getMediatorByCode,
} from '../controllers/mediator';

const mediatorRoutes: Router = Router();

mediatorRoutes.get('/', [authMiddleware], errorHandler(getMediators));
mediatorRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createMediator));
mediatorRoutes.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateMediator));
mediatorRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteMediator));
mediatorRoutes.get('/:id', [authMiddleware], errorHandler(getMediatorById));

mediatorRoutes.get('/code/:code', [authMiddleware], errorHandler(getMediatorByCode));

export default mediatorRoutes;
