import * as fromServices from '../services';
import { AppHttpError } from '@modules/core';
import * as jwt from 'jsonwebtoken';

export const register = [createUser, login];

export async function getAllUsers(req, res, next) {
  const users = await fromServices.getAllUsers();

  res.json({ users });
}

export async function createUser(req, res, next) {
  const { email, password, name } = req.body;

  const user = await fromServices.createUser({ email, password, name });

  res.json({ user });
}

export async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await fromServices.getUser({ email });
  if (!user) {
    throw new AppHttpError(409, 'EXIST');
  }

  if (!user.comparePassword(password)) {
    throw new AppHttpError(401, 'UNAUTH');
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_JWT, { expiresIn: '30s' });

  res.set('Authorization', accessToken);
  res.sendStatus(200);
  res.end();
}

export async function authorization(req, res, next) {
  debugger;

  const authorizationHeader = req.headers['authorization'];

  const [method, token] = authorizationHeader.split(' ');

  if (method !== 'basic') {
    throw new AppHttpError(401, 'unauthorize');
  }

  var decoded = jwt.verify(token, process.env.SECRET_JWT);
  const { id } = decoded;
  const user = await fromServices.findUser({ id });
  if (!user) {
    throw new AppHttpError(401, 'unauthorize');
  }

  req.user = user;
  
  next();
}
