import { Router } from 'express';
import { errorHandler } from '../error-handler';

import adminMiddleware from '../middlewares/admin';
import authMiddleware from '../middlewares/auth';
import { getDigitalSignatureByContract } from '../controllers/digitalSignature';

const digitalSignatureRouter: Router = Router();

/* digitalSignatureRouter.get('/', [authMiddleware], errorHandler());
digitalSignatureRouter.post('/', [authMiddleware, adminMiddleware], errorHandler());
digitalSignatureRouter.put('/:id', [authMiddleware, adminMiddleware], errorHandler());
digitalSignatureRouter.delete('/:id', [authMiddleware, adminMiddleware], errorHandler()); */
digitalSignatureRouter.get('/:contract', [authMiddleware], errorHandler(getDigitalSignatureByContract));

/* digitalSignatureRouter.get('/code/:code', [authMiddleware], errorHandler());
 */
export default digitalSignatureRouter;
