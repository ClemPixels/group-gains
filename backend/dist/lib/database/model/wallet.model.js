import mongoose, { Schema, Document, Model } from "mongoose";
const walletSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: { type: Number, required: true, default: 0 },
    withdraw: { type: Number, required: true, default: 0 },
}, { timestamps: true });
export const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);
