import jwt from "jsonwebtoken";
import { verifyPassword } from "../helpers/encrypt";
import {
  successResponseWithToken,
  errorResponse,
  successResponseWithPagination,
  successResponse,
} from "../helpers/responseUtil";
import Model from "../models";
import "babel-polyfill";

require("dotenv").config();

const { User, Admin } = Model;

class AdminController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({
        where: { email: email.toLowerCase() },
      });

      if (!admin) return errorResponse(res, 400, "email or password is invalid");
      const confirmPassword = verifyPassword(password, admin.password);
      if (!confirmPassword)
        return errorResponse(res, 400, "email or password is invalid");
      const token = jwt.sign(
        { id: admin.id, email: admin.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.TOKEN_EXPIRATION }
      );
      return successResponseWithToken(
        res,
        200,
        "login successful",
        admin,
        token
      );
    } catch (err) {
      /* istanbul ignore next */
      next(err);
    }
  }

  static async getAllUsers(req, res, next) {
    let limit = 10;
    let offset = 0;

    try {
      const page = req.query.page ? req.query.page : 1;
      offset = limit * (page - 1);

      const users = await User.findAndCountAll({
        limit,
        offset,
      });
      successResponseWithPagination(res, 200, users, page, limit);
    } catch (err) {
      /* istanbul ignore next */
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const {
        name,
        groups,
        state,
        features,
      } = req.body;
      const user = await User.findOne({ where: { id: id } });
      if (!user) return errorResponse(res, 404, "User not found");
      const updatedUser = await User.update(
        {
          name,
          groups,
          state,
          features,

        },
        { where: { id: id } }
      );
      successResponse(res, 200, updatedUser);
    } catch (err) {
      /* istanbul ignore next */
      next(err);
    }
  }
}

export default AdminController;
