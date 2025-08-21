export class AppError extends Error {
  constructor(type, value, message) {
    super(message);
    this.type = type;
    this.value = value;
    this.isOperational = true;
  }
}
