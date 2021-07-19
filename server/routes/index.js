import express from 'express';
import { errorResponse, successResponse } from '../helpers/responseUtil';
import AdminRouter from './adminRoute';

const router = express.Router();

router.get('/', (req, res) => {
  successResponse(res, 200, null);
});

router.use('/', AdminRouter);

router.all('*', (req, res) => {
  errorResponse(res, 404, '404 Page not found');
});

export default router;
