import jwt from 'jsonwebtoken';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const users: User[] = [];

export const getAllUsers = () => {
  return users;
};

export const createUser = ({ name, email, password }) => {
  const user = { id: users.length, name, email, password };

  users.push(user);

  return user;
};

export const token = userId => {
  const token = jwt.sign({ data: userId }, process.env.SECRET_JWT, { expiresIn: '1h' });
  return token;
};

export const getUser = ({ email }) => {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  return user;
};


export function findUser({ id }) {
  return users.find(u => u.id === id);
}