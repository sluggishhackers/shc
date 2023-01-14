import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { cac } from "https://unpkg.com/cac/mod.ts";

import * as fetchForDaejeonCommittees from "./clients/daejeon-committees/fetch.ts";
import * as parserForDaejeonCommittes from "./clients/daejeon-committees/parser.ts";

const cli = cac("shc");

cli
  .command("committees <region>", "committees from ...")
  .option("--page [page]", "page number")
  .action(async (region, _options) => {
    switch (region) {
      case "daejeon": {
        const html = await fetchForDaejeonCommittees.fetchLocalCommittees({
          page: 1,
        });

        const localCommittees =
          await parserForDaejeonCommittes.parseLocalCommittees(html);

        console.log(localCommittees);
        break;
      }
      default: {
        throw new Error("Not supported region");
      }
    }
  });

cli.parse();
