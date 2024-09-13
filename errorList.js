class BaseError {
  constructor(message, status) {
    this.message = message;
    this.status = status;
  }
}

class NotFoundError extends BaseError {
  constructor(message) {
    super();
    this.status = 404;
    this.message = message;
  }
}

class ValidationError extends BaseError {
  constructor(message) {
    super();
    this.status = 400;
    this.message = message;
  }
}

class Unauthorized extends BaseError {
  constructor(message) {
    super();
    this.status = 401;
    this.message = message;
  }
}

class Unprocessable extends BaseError {
  constructor(message) {
    super();
    this.status = 422;
    this.message = message;
  }
}

class BadRequest extends BaseError {
  constructor(message) {
    super();
    this.status = 400;
    this.message = message;
  }
}

class UnsupportedMediaType extends BaseError {
  constructor(message) {
    super();
    this.status = 415;
    this.message = message;
  }
}

module.exports = {
  BadRequest,
  Unauthorized,
  Unprocessable,
  NotFoundError,
  ValidationError,
  UnsupportedMediaType,
};
