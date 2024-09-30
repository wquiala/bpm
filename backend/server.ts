import express, { Express, NextFunction, Response, Request } from 'express';
import cron from 'node-cron';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { NODE_ENV, PORT } from './secrets';
import { errorMiddleware } from './middlewares/errors';
import path from 'path';
import cors from 'cors';
import { sendEmailWithIncidencesByContract } from './jobs/sendEmailWithIncidencesByContract';
import logger from './logger';

import schedule from 'node-schedule';
/* import { checkNoLoadedContracts } from './jobs/checkNoLoadedContracts';
 */ /* import { checkNoLoadedContracts } from "./jobs/checkNoLoadedContracts";
 */
const app: Express = express();

// Create a transporter object using the default SMTP transport

// Schedule task to run every minute
schedule.scheduleJob('0 * * * *', async () => {
   console.log('Executing cron jobs');
   await sendEmailWithIncidencesByContract();
});

/* setInterval(async () => {
   await sendEmailWithIncidencesByContract();
}, 5000); */ // 5,000 mil/ */isegundos = 5 segundos

// Middleware para loggear todas las solicitudes
app.use((req: Request, res: Response, next: NextFunction) => {
   logger.info(`${req./*  */ method} ${req.url}`);
   next();
});
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   logger.error('Error occurred: %o', err);
   res.status(500).send('Something went wrong!');
});

app.use(express.json());

app.use(cors());

app.use('/api', rootRouter);

export const prismaClient = new PrismaClient();

if (NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, '../frontend/dist/')));

   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')));
} else {
   app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorMiddleware);

app.listen(PORT, () => {
   console.log(`App working on port: ${PORT}!`);
});
