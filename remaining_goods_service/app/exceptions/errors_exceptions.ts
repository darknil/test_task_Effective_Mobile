import { Exception } from '@adonisjs/core/exceptions'

export class AlreadyExistsException extends Exception {
  constructor(message: string = 'Resource already exists') {
    super(message, { status: 409 }) // 409 Conflict HTTP status code
  }
}
export class NotFoundException extends Exception {
  constructor(message: string = 'Resource not found') {
    super(message, { status: 404 }) // 404 Not Found HTTP status code
  }
}
