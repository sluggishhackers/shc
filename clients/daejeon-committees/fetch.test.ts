import { fetchLocalCommittees } from "./fetch.ts";

Deno.test("fetch - local committees", async () => {
  await fetchLocalCommittees({ page: 1 });
});
