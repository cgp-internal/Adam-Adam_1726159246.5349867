import express, { Express, Request, Response } from 'express';
import { vacationsRouter } from './api/vacations.ts';
import { authRouter } from './api/auth.ts';
import { dbConnection } from './db/db.ts';

const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use('/vacations', vacationsRouter);
app.use('/auth', authRouter);

dbConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}).catch((err) => {
  console.error(err);
});