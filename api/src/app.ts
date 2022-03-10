import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

// Error Handling
app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  const httpCode = err.statusCode || err?.response?.status || 500;

  console.log(err);

  if (err.toJSON) {
    err = err.toJSON();
  }

  return res.status(httpCode).json(err);
});

app.listen(8000, () => {
  console.log('Server is on 🟢');
});