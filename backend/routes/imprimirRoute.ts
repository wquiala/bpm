import { Router } from 'express';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middlewares/auth';
import {
   createIncidenceDocument,
   deleteIncidenceDocument,
   getIncidenceDocumentById,
   getIncidenceDocuments,
   updateIncidenceDocument,
} from '../controllers/incidenceDocument';

const imprimirRoute: Router = Router();

imprimirRoute.post('/', [authMiddleware], errorHandler(createIncidenceDocument));

export default imprimirRoute;
