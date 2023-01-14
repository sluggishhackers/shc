import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

export const fetchLocalCommitteeDetail = async ({
  code,
}: {
  code: number;
}): Promise<string> => {
  const result = await axiod.get(
    `https://www.daejeon.go.kr/drh/acm/drhAcmBoardView.do?acmCode=${code}`
  );

  return result.data;
};

export const fetchLocalCommittees = async ({
  page,
}: {
  page: number;
}): Promise<string> => {
  const result = await axiod.post(
    "https://www.daejeon.go.kr/drh/acm/drhAcmBoardList.do",
    {
      pageIndex: page,
      menuSeq: "6412",
    }
  );

  return result.data;
};
