import { sendMessage } from "./slack.ts";

Deno.test("slack - sendMessage", async () => {
  await sendMessage({ text: "test" });
});
