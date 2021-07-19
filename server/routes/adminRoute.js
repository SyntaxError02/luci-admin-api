import express from 'express';
import AdminController from '../controllers/AdminController';
import { loginAdminValidator, updateUserValidator } from '../middlewares/adminValidations';
import { isLoggedIn } from '../middlewares/authenticate';
import { validateParam } from '../middlewares/paramsValidation';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdminValidator, AdminController.login);
adminRouter.get('/users', isLoggedIn, AdminController.getAllUsers);
adminRouter.patch('/users/:id', isLoggedIn, validateParam, updateUserValidator, AdminController.updateUser);


export default adminRouter;
