import { Router } from 'express';
import { errorHandler } from '../error-handler';

import authMiddleware from '../middlewares/auth';
import {
   createComunication,
   downloadEmail,
   getComunicationById,
   getComunications,
   sendEmail,
} from '../controllers/comunication';
import path from 'path';

const comunicationsRouter: Router = Router();

comunicationsRouter.get('/', [authMiddleware], errorHandler(getComunications));
comunicationsRouter.post('/', [authMiddleware], errorHandler(createComunication));
comunicationsRouter.get('/:id', [authMiddleware], errorHandler(getComunicationById));
comunicationsRouter.post('/send-emails', [authMiddleware], errorHandler(sendEmail));
comunicationsRouter.post('/send-emails/:clave', [authMiddleware], errorHandler(downloadEmail));
comunicationsRouter.get('/send-emails/:filename', (req, res) => {
   const { filename } = req.params;
   const filePath = path.join(__dirname, 'files', filename);
   res.sendFile(filePath);
});

export default comunicationsRouter;
