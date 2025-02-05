import { Hono } from "hono";
import { paypalAxiosInstance } from "../lib/axios/config.js";
import { CLIENT_DOMAIN } from "../lib/env.js";
import { randomBytes } from "crypto";
import { Paypal } from "../lib/database/model/integration.model.js";
const paypalRoute = new Hono();
paypalRoute.get("/account/create", async (c) => {
    const { email, id } = c.get("user");
    const trackingId = randomBytes(10).toString("hex");
    const res = await paypalAxiosInstance.post("/customer/partner-referrals", {
        email,
        tracking_id: `tracking_${trackingId}`,
        partner_config_override: {
            return_url: `${CLIENT_DOMAIN}/dashboard/payout`,
            return_url_description: "the url to return the merchant after the paypal onboarding process.",
            show_add_credit_card: true,
        },
        operations: [
            {
                operation: "API_INTEGRATION",
                api_integration_preference: {
                    rest_api_integration: {
                        integration_method: "PAYPAL",
                        integration_type: "THIRD_PARTY",
                        third_party_details: {
                            features: ["PAYMENT", "REFUND", "PARTNER_FEE"],
                        },
                    },
                },
            },
        ],
        products: ["PAYMENT_METHODS"],
        capabilities: ["APPLE_PAY"],
        legal_consents: [{ type: "SHARE_DATA_CONSENT", granted: true }],
    });
    // Check for existing PayPal document
    const existingPaypal = await Paypal.findOne({ owner: id });
    if (!existingPaypal) {
        // Create a new document if none exists
        await Paypal.create({ owner: id, tracking_id: trackingId });
    }
    else {
        // Update the existing document
        await Paypal.updateOne({ owner: id }, { $set: { tracking_id: trackingId } });
    }
    return c.json({
        success: true,
        message: `PayPal onboarding link successfully created with tracking ID tracking_${trackingId}. Please complete the onboarding process.`,
        result: res.data,
    }, 200);
});
export default paypalRoute;
