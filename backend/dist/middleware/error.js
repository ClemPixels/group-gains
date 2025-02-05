import { AxiosError } from "axios";
export const errorHandler = async (c, next) => {
    try {
        await next();
    }
    catch (err) {
        // Log the error details
        console.error("Error caught in middleware:", err);
        let response;
        // Check for specific error types
        if (err instanceof ValidationError) {
            // Custom validation error response
            response = {
                error: "Validation Error",
                message: err.message,
                details: err.details, // Add field-specific details if available
            };
            return c.json(response, { status: 400 });
        }
        if (err instanceof AxiosError) {
            response = {
                error: "External API Error",
                message: err.response?.data?.message || err.message,
                details: err.response?.data || null,
            };
            const statusCode = err.status || 500;
            return c.json(response, { status: statusCode });
        }
        if (err instanceof SyntaxError) {
            // Handle syntax errors (e.g., invalid JSON payloads)
            response = {
                error: "Bad Request",
                message: "Invalid JSON syntax in the request body.",
            };
            return c.json(response, { status: 400 });
        }
        // Generic fallback error for unexpected issues
        response = {
            error: "Internal Server Error",
            message: "Something went wrong on our end. Please try again later.",
        };
        return c.json(response, { status: 500 });
    }
};
// Custom ValidationError class
class ValidationError extends Error {
    details;
    constructor(message, details = {}) {
        super(message);
        this.name = "ValidationError";
        this.details = details;
    }
}
