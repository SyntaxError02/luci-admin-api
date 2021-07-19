import Joi from 'joi';
import { errorResponse } from '../helpers/responseUtil';

export const validateParam = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().min(1)
  });
  const { id } = req.params;
  const { error } = schema.validate({ id });
  if (error) {
    const { details } = error;
    return errorResponse(res, 422, details[0].message);
  }

  return next();
};
