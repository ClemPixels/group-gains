import mongoose, { Schema, Document, Model } from "mongoose";
const customerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    anonymous_key: { type: String, required: true, unique: true },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
export const Customer = mongoose.models.Customer ||
    mongoose.model("Customer", customerSchema);
