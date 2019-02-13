import * as fromServices from '../services';

export const getAllUsers = (req, res, next) => {
  const users = fromServices.getAllUsers();

  res.json({ users });
};
