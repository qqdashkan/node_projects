class BaseError {
  constructor(message, status, additionalInfo) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

class NotFoundError extends BaseError {
  constructor(additionalInfo) {
    super();
    this.status = 404;
    this.message = 'Not Found';
    this.additionalInfo = additionalInfo;
  }
}

class ValidationError extends BaseError {
  constructor(additionalInfo) {
    super();
    this.status = 400;
    this.message = 'Validation Error';
    this.additionalInfo = additionalInfo;
  }
}

class Unauthorized extends BaseError {
  constructor(additionalInfo) {
    super();
    this.status = 401;
    this.message = 'User not required';
    this.additionalInfo = additionalInfo;
  }
}

class Unprocessable extends BaseError {
  constructor(additionalInfo) {
    super();
    this.status = 422;
    this.message = 'Email or password is invalid';
    this.additionalInfo = additionalInfo;
  }
}

module.exports = {
  ValidationError,
  Unauthorized,
  Unprocessable,
  NotFoundError,
};
