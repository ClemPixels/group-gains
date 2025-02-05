import { Hono } from "hono";
export const subscription = new Hono();
subscription.get("/hello-bot", (c) => {
    return c.text("Hello User");
});
