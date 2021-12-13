export default class ApiError extends Error {
  status
  errors

  constructor(status: number, message: string, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, "Unauthorized error")
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors)
  }

  static NotAllowed() {
    return new ApiError(401, "Not Allowed")
  }

  static UserDoesNotExist() {
    return new ApiError(404, "User doesn't exist")
  }
}
