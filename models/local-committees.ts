export type LocalCommittee = {
  id?: number;
  category: string;
  title: string;
  roles: string;
  createdDate: string; // YYYY-MM-DD
  department: string;
  code: string;
};

type SexRatio = {
  male: number;
  female: number;
};

export enum PositionsForSexRatio {
  "위촉직" = "위촉직",
  "당연직" = "당연직",
  "임명직" = "임명직",
  "공개모집" = "공개모집",
}

export type LocalCommitteeDetail = {
  category: string;
  title: string;
  department: string;
  reference: string;
  basis: string;
  purpose: string;
  roles: string;
  createdDate: string | null; // YYYY-MM-DD
  revocatedDate: string | null;
  status: string;
  sexRatio: {
    civilServant: { [key in PositionsForSexRatio]: SexRatio };
    civilian: {
      sido: { [key in PositionsForSexRatio]: SexRatio };
      recommendation: { [key in PositionsForSexRatio]: SexRatio };
      citizen: { [key in PositionsForSexRatio]: SexRatio };
    };
  };
  operations: {
    year: number;
    holdingCount: number;
    budget: number;
    expenditure: number;
  }[];
};
