import { Hono } from "hono";
import { Wallet } from "../lib/database/model/wallet.model.js";
const walletRoute = new Hono();
walletRoute.get("/wallet", async (c) => {
    const user = c.get("user");
    const wallet = await Wallet.findOne({ owner: user.id });
    return c.json({ success: true, message: "", result: wallet }, 200);
});
export default walletRoute;
