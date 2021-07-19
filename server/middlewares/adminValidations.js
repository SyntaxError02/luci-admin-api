import Joi from 'joi';
import { errorResponse } from '../helpers/responseUtil';

export const loginAdminValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  });
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });
  if (error) {
    const { details } = error;
    return errorResponse(res, 422, details[0].message);
  }

  return next();
};

export const updateUserValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2),
    groups: Joi.array().required(),
    state: Joi.boolean().required(),
    features: Joi.array().required(),
  });
  const { name, groups, state, features } = req.body;

  const { error } = schema.validate({
    name,
    groups,
    state,
    features,
  });
  if (error) {
    const { details } = error;
    return errorResponse(res, 422, details[0].message);
  }

  return next();
};

