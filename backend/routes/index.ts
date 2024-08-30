import { Router } from 'express';
import authRoutes from './auth';
import companyRoutes from './company';
import userRoutes from './user';
import loadRoutes from './load';
import mediatorRoutes from './mediator';
import branchRoutes from './branch';
import contractRoutes from './contract';
import contractObservationRoutes from './contractObservation';
import contractDocumentRoutes from './contractDocument';
import incidenceDocumentRoutes from './incidenceDocument';
import familyDocumentRoutes from './familyDocument';
import TypeConciliationRoutes from './typeConciliation';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/users', userRoutes);
rootRouter.use('/load', loadRoutes);

rootRouter.use('/companies', companyRoutes);
rootRouter.use('/mediators', mediatorRoutes);
rootRouter.use('/branches', branchRoutes);
rootRouter.use('/contracts', contractRoutes);
rootRouter.use('/contract-observations', contractObservationRoutes);
rootRouter.use('/contract-documents', contractDocumentRoutes);
rootRouter.use('/incidence-documents', incidenceDocumentRoutes);
rootRouter.use('/family-documents', familyDocumentRoutes);
rootRouter.use('/type-conciliations', TypeConciliationRoutes);

export default rootRouter;
