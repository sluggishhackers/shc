import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

export const fetchLocalCommitteeDetail = async ({
  code,
}: {
  code: string;
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
  const formData = new FormData();
  formData.append("pageIndex", `${page}`);
  const result = await fetch(
    "https://www.daejeon.go.kr/drh/acm/drhAcmBoardList.do",
    {
      method: "POST",
      body: formData,
    }
  );

  return result.text();
};
