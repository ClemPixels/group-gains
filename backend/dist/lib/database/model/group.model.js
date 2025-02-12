import mongoose, { Schema, Document, Model } from "mongoose";
const groupSchema = new Schema({
    group_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price_id: { type: String },
    revenue: { type: Number, required: true, default: 0 },
    currency_code: { type: String, default: "USD", required: true },
    price: { type: Number, required: true, default: 0 },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
export const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);
