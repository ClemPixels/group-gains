import mongoose, { Model, Schema } from "mongoose";
import { Document } from "mongoose";
const subscriptionSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    telegram_user_id: Number,
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    currency_code: { type: String, default: "USD", required: true },
    of_group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    subscription_key: { type: String, required: true, unique: true },
    anonymous_key: { type: String, required: true, unique: true },
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    billing: {
        cycle: { type: String, enum: ["month", "year"] },
        billing_start: { type: Date },
        billing_end: { type: Date },
    },
    status: {
        type: String,
        required: true,
        enum: ["activated", "canceled"],
    },
    gateway: {
        provider: {
            type: String,
            enum: ["stripe", "paddle"],
        },
        paddle: {
            price_id: { type: String },
            subscription: {
                id: { type: String },
                entity_type: { type: String },
            },
        },
    },
}, { timestamps: true });
export const Subscription = mongoose.models.Subscription ||
    mongoose.model("Subscription", subscriptionSchema);
