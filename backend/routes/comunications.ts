import { Router } from 'express';
import { errorHandler } from '../error-handler';

import authMiddleware from '../middlewares/auth';
import { createComunication, getComunicationById, getComunications, sendEmail } from '../controllers/comunication';

const comunicationsRouter: Router = Router();

comunicationsRouter.get('/', [authMiddleware], errorHandler(getComunications));
comunicationsRouter.post('/', [authMiddleware], errorHandler(createComunication));
comunicationsRouter.get('/:id', [authMiddleware], errorHandler(getComunicationById));
comunicationsRouter.post('/send-emails', [authMiddleware], errorHandler(sendEmail));

export default comunicationsRouter;
