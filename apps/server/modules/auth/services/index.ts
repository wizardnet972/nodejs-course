import jwt from 'jsonwebtoken';
import { User } from '../mongodb';
import { AppHttpError } from '@server/modules/core';

export const getAllUsers = async () => {
  return await User.find({});
};

export const createUser = async ({ name, email, password }) => {
  let user = await User.findOne({ email });
  if (user) {
    throw new AppHttpError(500, 'EXIST');
  }

  user = new User({ name, email, password });

  user = await user.save();

  return user;
};

export const token = userId => {
  const token = jwt.sign({ data: userId }, process.env.SECRET_JWT, { expiresIn: '1h' });
  return token;
};

export const getUser = async ({ email }) => {
  const user = await User.findOne({ email }); //users.find(u => u.email.toLowerCase() === email.toLowerCase());

  return user;
};

export async function findUser({ id }) {
  return await User.findById(id);
}
