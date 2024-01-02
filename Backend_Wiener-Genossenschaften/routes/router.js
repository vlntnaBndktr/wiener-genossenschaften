import { Router } from 'express';

import { checkToken } from '../common/utils.js';

import {
  getAllUsers,
  getOneUser,
  passwordValidation,
  changePassword,
  updateUser,
  updateValidation,
  deleteValidation,
  deleteUser,
} from '../controllers/users.js';

import { signupValidation, signup } from '../controllers/users-signup.js';
import { login } from '../controllers/users-login.js';
import { createProject } from '../controllers/projects.js';

const router = new Router();

//User Routen:
router.get('/users', getAllUsers);
router.get('/user/:userId', getOneUser);
router.post('/user/signup', signupValidation, signup);
router.post('/user/login', login);
router.patch(
  '/user/change-password',
  checkToken,
  passwordValidation,
  changePassword
);
router.patch('/user/update', checkToken, updateValidation, updateUser);
router.delete('/user', checkToken, deleteValidation, deleteUser);

//Projects Routen
router.post('/project', createProject);

//Favorites Routen
// router.post('/favorites/:userId/:projectId', createFavorite);

export default router;
