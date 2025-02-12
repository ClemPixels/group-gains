import mongoose, { Schema, Document, Model } from "mongoose";
const integrationSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    paypal: {
        email: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
            default: "USD"
        },
    },
}, { timestamps: true });
export const Integration = mongoose.models.Integration ||
    mongoose.model("Integration", integrationSchema);
