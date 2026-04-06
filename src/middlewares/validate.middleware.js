export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return next({
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      statusCode: 400,
      details: result.error.errors,
    });
  }

  req.body = result.data;
  next();
};