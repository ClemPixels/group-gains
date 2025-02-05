import mongoose, { Schema, Document, Model } from "mongoose";
const payoutSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "created",
    },
    paypal: {
        payout_batch_id: { type: String, required: true },
        payout_item_id: { type: String, required: true },
    },
}, { timestamps: true });
export const Payout = mongoose.models.Payout || mongoose.model("Payout", payoutSchema);
