import { parseLocalCommitteeDetail, parseLocalCommittees } from "./parser.ts";
import { fetchLocalCommitteeDetail, fetchLocalCommittees } from "./fetch.ts";

Deno.test("parser - local committee detail", async () => {
  const html = await fetchLocalCommitteeDetail({ code: 166 });
  const localCommitteeDetail = parseLocalCommitteeDetail(html);
  console.log(localCommitteeDetail);
});

Deno.test("parser - local committees", async () => {
  const html = await fetchLocalCommittees({ page: 1 });
  const localCommittees = parseLocalCommittees(html);
  console.log(localCommittees);
});
