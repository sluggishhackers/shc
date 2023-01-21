import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

export const sendMessage = ({ text }: { text: string }) => {
  return axiod.post(Deno.env.get("SLACK_WEBHOOK_URL") as string, { text });
};
