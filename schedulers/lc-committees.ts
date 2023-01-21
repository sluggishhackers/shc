import { cron } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import database from "../database/client.ts";
import * as fetchForDaejeonCommittees from "../clients/daejeon-committees/fetch.ts";
import * as parserForDaejeonCommittes from "../clients/daejeon-committees/parser.ts";
import { sendMessage } from "../utils/slack.ts";

const main = async () => {
  sendMessage({ text: "lc-committees scheduler is running." });

  const html = await fetchForDaejeonCommittees.fetchLocalCommittees({
    page: 1,
  });

  const localCommittees = await parserForDaejeonCommittes.parseLocalCommittees(
    html
  );

  for (const localCommittee of localCommittees) {
    const detailHtml =
      await fetchForDaejeonCommittees.fetchLocalCommitteeDetail({
        code: localCommittee.code,
      });

    const detail =
      parserForDaejeonCommittes.parseLocalCommitteeDetail(detailHtml);

    try {
      const result = await database.upsertById(
        "lc-committees",
        { title: localCommittee.title },
        {
          ...localCommittee,
          ...detail,
        }
      );

      console.log("status: ", result.status);
      console.log("statusText: ", result.statusText);
    } catch (e) {
      console.error(e);
    }
  }
};

cron("1 */10 * * * *", async () => {
  await main();
});
