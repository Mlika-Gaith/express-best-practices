/**
 * Represents an HTTP error.
 * @extends {Error}
 */
export class HttpException extends Error {
  status: number;
  message: string;
  /**
   * Creates an instance of HttpException.
   * @param {number} status - The HTTP status code.
   * @param {string} message - The error message.
   */
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
