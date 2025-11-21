class AppError extends Error {
  constructor(message, statusCode = 500, name = 'AppError') {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NotFoundError');
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 400, 'ValidationError');
  }
}

class AuthError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AuthError');
  }
}

module.exports = { AppError, NotFoundError, ValidationError, AuthError };
