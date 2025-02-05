import mongoose, { Schema, Document, Model } from "mongoose";
const transactionSchema = new Schema({
    price: {
        type: Number,
    },
    currency_code: { type: String, default: "USD", required: true },
    status: { type: String, default: "created" },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
    },
    of_group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    anonymous_key: { type: String, required: true, unique: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
export const Transaction = mongoose.models.Transaction ||
    mongoose.model("Transaction", transactionSchema);
