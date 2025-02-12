import mongoose, {} from "mongoose";
import { MONGODB_URI } from "../env.js";
// Ensure the MongoDB URI is defined
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}
// Use a global cached object for maintaining a single connection instance
const cached = global.mongoose || {
    conn: null,
    promise: null,
};
if (!global.mongoose) {
    global.mongoose = cached;
}
async function db() {
    // Return the cached connection if available
    if (cached.conn) {
        console.log("Mongoose connection is already exists");
        return cached.conn;
    }
    if (!cached.promise) {
        console.log("New mongoose connection is established");
        const opts = {
            bufferCommands: false,
        };
        // Create a new connection promise and cache it
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    }
    catch (e) {
        cached.promise = null; // Reset the promise on failure
        throw e; // Rethrow the error to be handled by the caller
    }
    return cached.conn;
}
export default db;
