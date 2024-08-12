/**
 * CustomError class for handling HTTP errors with custom status codes and messages.
 * @extends {Error}
 */
export class CustomError extends Error {
    /** 
     * The HTTP status code associated with the error.
     * @type {number}
     */
    public readonly statusCode: number;

    /** 
     * An optional string providing additional error details.
     * @type {string | undefined}
     */
    public readonly error?: string;

    /**
     * Creates an instance of CustomError.
     * @param {number} statusCode - The HTTP status code for the error.
     * @param {string} message - A descriptive message for the error.
     * @param {string} [error] - Optional additional error details.
     */
    constructor(statusCode: number, message: string, error?: string) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;

        // Maintain proper stack trace (only works in V8 engines like Node.js)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}