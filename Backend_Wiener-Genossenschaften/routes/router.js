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
import { login, logout } from '../controllers/authentication.js';
import {
  projectValidation,
  createProject,
  getAllProjects,
  getOneProject,
  updateProject,
  deleteProject,
} from '../controllers/projects.js';

import {
  favoriteValidation,
  createFavorite,
  updateFavorite,
  deleteFavorite,
  getAllFavorites,
  getOneFavorite,
} from '../controllers/favorites.js';

const router = new Router();

// TODO Admin-Zugriff für Routen!

//User Routen:
router.get('/users', getAllUsers);
router.get('/user/:userId', getOneUser);
router.post('/user/signup', signupValidation, signup);
router.post('/user/login', login);
router.post('/user/logout', checkToken, logout);
router.patch(
  '/user/change-password',
  checkToken,
  passwordValidation,
  changePassword
);
router.patch('/user/update', checkToken, updateValidation, updateUser);
router.delete('/user/delete', checkToken, deleteValidation, deleteUser);

//Projects Routen
router.post('/project', projectValidation, createProject);
router.get('/projects', getAllProjects);
router.get('/project/:_id', getOneProject);
router.post('/project/update/:_id', projectValidation, updateProject);
router.delete('/project/delete/:_id', deleteProject);

//Favorites Routen
router.post(
  '/favorite/:_projectId',
  checkToken,
  favoriteValidation,
  createFavorite
);
router.patch(
  '/favorite/update/:_id',
  checkToken,
  favoriteValidation,
  updateFavorite
);
router.delete('/favorite/delete/:_id', checkToken, deleteFavorite);
router.get('/favorites', checkToken, getAllFavorites);
router.get('/favorite/:_id', checkToken, getOneFavorite);

export default router;
