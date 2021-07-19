import jwt from 'jsonwebtoken';
import { errorResponse } from '../helpers/responseUtil';

/**
 * @description - check if a customer is logged in
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {object} next
 *
 * @returns
 */
export const isLoggedIn = (req, res, next) => {
  const token = req.get('Authorization') && req.get('Authorization').slice(7);
  if (!token) {
    return errorResponse(res, 401, 'Unauthorized Access');
  }

  jwt.verify(token.slice(7), process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return errorResponse(res, 401, `${err.message}..Please log in to continue`);
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.userEmail = decoded.email;
    req.userName = `${decoded.firstName} ${decoded.lastName}`;
    return next();
  });
};
