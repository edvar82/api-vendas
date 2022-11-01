import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@modules/AppErrors';
import '@shared/typeorm';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'ERROR',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'ERROR',
    message: 'Internal server Error',
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
