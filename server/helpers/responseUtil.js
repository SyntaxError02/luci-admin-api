/**
 * Error response
 *
 * @param  {string} error - error string
 * @param  {Integer} statusCode - status code
 * @param {any} response - expressJS response object
 * @returns {object} response object
 */
export const errorResponse = (response, statusCode, error) => {
  response.status(statusCode).json({
    success: false,
    message: error,
  });
};

/**
 * Success response
 *
 * @param  {string} message - response message
 * @param  {Integer} statusCode - status code
 * @param {Array} response - data object
 * @returns {object} response object
 */
export const successResponse = (response, statusCode, data) => {
  response.status(statusCode).json(data);
};

/**
 * Success response
 *
 * @param  {string} message - response message
 * @param  {Integer} statusCode - status code
 * @param {Array} response - data object
 * @returns {object} response object
 */
export const successResponseWithToken = (
  response,
  statusCode,
  message,
  data,
  token
) => {
  response.status(statusCode).json({
    success: true,
    message,
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    },
    token: `Bearer ${token}`,
  });
};

/**
 * Success response with pagination
 *
 * @param  {string} message - response message
 * @param  {Integer} statusCode - status code
 * @param {Array} response - data object
 * @returns {object} response object
 */
export const successResponseWithPagination = (
  response,
  statusCode,
  data,
  page,
  limit = 10
) => {
  const { count: totalItems, rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  response.status(statusCode).json({
    totalItems,
    totalPages,
    currentPage,
    rows,
  });
};
