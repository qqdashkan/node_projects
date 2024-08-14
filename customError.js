class CustomError {
  constructor(message, status, additionalInfo) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

class newError extends CustomError {
  constructor(additionalInfo) {
    super();
    this.status = 422;
    this.message = 'Data is invalid';
    this.additionalInfo = additionalInfo;
  }
}

class ValidationError extends CustomError {
  constructor(additionalInfo) {
    super();
    this.status = 400;
    this.message = 'Validation Error';
    this.additionalInfo = additionalInfo;
  }
}

class Unauthorized extends CustomError {
  constructor(additionalInfo) {
    super();
    this.status = 401;
    this.message = 'User not required';
    this.additionalInfo = additionalInfo;
  }
}

module.exports = {
  newError,
  ValidationError,
  Unauthorized,
};
