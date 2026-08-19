const AppError = require('../utils/app-error');

const validate = (schema, source = 'body') => (req, _res, next) => {
  const { error, value } = schema.validate(req[source], { abortEarly: false, stripUnknown: true });
  if (error) {
    const message = error.details.map((d) => d.message).join('; ');
    return next(new AppError(400, 'VALIDATION_ERROR', message));
  }
  req[source] = value;
  next();
};

module.exports = validate;
