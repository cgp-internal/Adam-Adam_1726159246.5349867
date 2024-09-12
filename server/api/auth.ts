import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../db/userModel';

const router: Router = express.Router();
const secretKey: string = 'secretKey';

let userModel: UserModel;

router.use(async (req: Request, res: Response, next: any) => {
  userModel = new UserModel(await import('../db/db').then((db) => db.dbConnection));
  next();
});

router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword: string = await bcrypt.hash(password, 10);
  try {
    await userModel.createUser(username, email, hashedPassword);
    res.status(201).send({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).send({ message: 'Error while creating user' });
  }
});

router.post('/authenticate', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: any = await userModel.getUserByUsername(username);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).send({ message: 'Invalid password' });
      } else {
        const token: string = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        res.status(200).send({ token: token });
      }
    }
  } catch (err) {
    res.status(500).send({ message: 'Error while authenticating user' });
  }
});

export { router as authRouter, authenticate, registerUser };

function authenticate(req: Request, res: Response) {
  const token: string = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    res.status(401).send({ message: 'No token provided' });
  } else {
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token' });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
}

function registerUser(req: Request, res: Response) {
  router.handle(req, res);
}