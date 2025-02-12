import { AxiosError } from "axios";
import { HTTPException } from "hono/http-exception";
const errorHandler = async (err, c) => {
    // Log the error details
    console.error("Caught error in error handler:", err);
    let response;
    // Check for specific error types
    if (err instanceof ValidationError) {
        // Custom validation error response
        response = {
            success: false,
            error: "Validation Error",
            message: err.message,
            result: err.details, // Add field-specific details if available
        };
        return c.json(response, err.status);
    }
    if (err instanceof AxiosError) {
        response = {
            success: false,
            error: "External API Error",
            message: err.response?.data?.message || err.message,
            result: err.response?.data || null,
        };
        const statusCode = err.status || 500;
        return c.json(response, { status: statusCode });
    }
    if (err instanceof SyntaxError) {
        // Handle syntax errors (e.g., invalid JSON payloads)
        response = {
            success: false,
            error: "Bad Request",
            message: "Invalid JSON syntax in the request body.",
            result: null
        };
        return c.json(response, { status: 400 });
    }
    // Generic fallback error for unexpected issues
    response = {
        success: false,
        error: "Internal Server Error",
        message: "Something went wrong on our end. Please check result for more info.",
        result: err,
    };
    return c.json(response, { status: 500 });
};
// Custom ValidationError class
export class ValidationError extends HTTPException {
    details;
    message;
    constructor(message, details = {}, statusCode = 500) {
        const errorResponse = new Response(JSON.stringify({
            error: "Validation Error",
            message,
            details,
        }), {
            status: statusCode,
        });
        super(statusCode, { res: errorResponse });
        this.details = details;
        this.message = message;
    }
}
export default errorHandler;
