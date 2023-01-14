// deno-lint-ignore-file no-explicit-any
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.21-alpha/deno-dom-wasm.ts";
import {
  LocalCommittee,
  LocalCommitteeDetail,
  PositionsForSexRatio,
} from "../../models/local-committees.ts";

function initPositionsForSexRatio() {
  return {
    공개모집: {
      male: 0,
      female: 0,
    },
    당연직: {
      male: 0,
      female: 0,
    },
    임명직: {
      male: 0,
      female: 0,
    },
    위촉직: {
      male: 0,
      female: 0,
    },
  };
}

export const parseLocalCommitteeDetail = (
  html: string
): LocalCommitteeDetail => {
  const localCommitteeDetail: LocalCommitteeDetail = {
    category: "",
    title: "",
    department: "",
    reference: "",
    basis: "",
    purpose: "",
    roles: "",
    createdDate: "",
    revocatedDate: "",
    status: "",
    sexRatio: {
      civilServant: initPositionsForSexRatio(),
      civilian: {
        sido: initPositionsForSexRatio(),
        recommendation: initPositionsForSexRatio(),
        citizen: initPositionsForSexRatio(),
      },
    },
    operations: [],
  };

  const doc: any = new DOMParser().parseFromString(html, "text/html");
  const list = doc.querySelectorAll(".board_view ul li");

  list.forEach((item: any) => {
    const label = item.querySelector(".subject").textContent.trim();

    switch (label) {
      case "위원회명":
        localCommitteeDetail.title = item
          .querySelector(".txt")
          .textContent.trim();
        break;
      case "관리부서":
        localCommitteeDetail.department = item
          .querySelector(".txt")
          .textContent.trim();
        break;
      case "문의처":
        localCommitteeDetail.reference = item
          .querySelector(".txt")
          .textContent.trim();
        break;
      case "설치구분":
        localCommitteeDetail.category = item
          .querySelector(".txt")
          .textContent.trim();
        break;
      case "설치근거":
        localCommitteeDetail.basis = item
          .querySelector(".txt")
          .textContent.trim();
        break;
      case "설치목적":
        localCommitteeDetail.purpose = item
          .querySelector(".txt")
          .textContent.trim();
        break;
      case "주요기능":
        localCommitteeDetail.roles = item
          .querySelector(".txt")
          .textContent.trim();
        break;
      case "설치일자":
        localCommitteeDetail.createdDate = item
          .querySelector(".txt")
          .textContent.trim();
        break;
      case "폐지일자":
        localCommitteeDetail.revocatedDate = item
          .querySelector(".txt")
          .textContent.trim();
        break;
      case "활동여부":
        localCommitteeDetail.status = item
          .querySelector(".txt")
          .textContent.trim();
        break;
      case "위원현황": {
        const rows = item.querySelectorAll("table tbody tr");
        rows.forEach((row: any, indexForPosition: number) => {
          let position: PositionsForSexRatio;
          switch (indexForPosition) {
            case 0:
              position = PositionsForSexRatio.위촉직;
              break;
            case 1:
              position = PositionsForSexRatio.당연직;
              break;
            case 2:
              position = PositionsForSexRatio.임명직;
              break;
            case 3:
              position = PositionsForSexRatio.공개모집;
              break;
          }

          const columns = row.querySelectorAll("td");
          columns.forEach((col: any, index: number) => {
            switch (index) {
              case 0:
                localCommitteeDetail.sexRatio.civilServant[position].male =
                  +col.textContent.trim();
                break;
              case 1:
                localCommitteeDetail.sexRatio.civilServant[position].female =
                  +col.textContent.trim();
                break;
              case 2:
                localCommitteeDetail.sexRatio.civilian.sido[position].male =
                  +col.textContent.trim();
                break;
              case 3:
                localCommitteeDetail.sexRatio.civilian.sido[position].female =
                  +col.textContent.trim();
                break;
              case 4:
                localCommitteeDetail.sexRatio.civilian.recommendation[
                  position
                ].male = +col.textContent.trim();
                break;
              case 5:
                localCommitteeDetail.sexRatio.civilian.recommendation[
                  position
                ].female = +col.textContent.trim();
                break;
              case 6:
                localCommitteeDetail.sexRatio.civilian.citizen[position].male =
                  +col.textContent.trim();
                break;
              case 7:
                localCommitteeDetail.sexRatio.civilian.citizen[
                  position
                ].female = +col.textContent.trim();
                break;
            }
          });
        });
        break;
      }
      case "운영현황": {
        const operations: {
          year: number;
          holdingCount: number;
          budget: number;
          expenditure: number;
        }[] = [];

        const rows = item.querySelectorAll("table tbody tr");
        rows.forEach((row: any, rowIndex: number) => {
          const columns = row.querySelectorAll("td");
          columns.forEach((col: any, colIndex: number) => {
            if (!operations[colIndex]) {
              operations[colIndex] = {
                year: 0,
                holdingCount: 0,
                budget: 0,
                expenditure: 0,
              };
            }

            switch (rowIndex) {
              case 0:
                operations[colIndex].year = +col.textContent
                  .trim()
                  .replace(/,/g, "");
                break;
              case 1:
                operations[colIndex].holdingCount = +col.textContent
                  .trim()
                  .replace(/,/g, "");
                break;
              case 2:
                operations[colIndex].budget = +col.textContent
                  .trim()
                  .replace(/,/g, "");
                break;
              case 3:
                operations[colIndex].expenditure = +col.textContent
                  .trim()
                  .replace(/,/g, "");
                break;
            }
          });
        });
        localCommitteeDetail.operations = operations;
        break;
      }
    }
  });

  return localCommitteeDetail;
};

export const parseLocalCommittees = (html: string): LocalCommittee[] => {
  const doc: any = new DOMParser().parseFromString(html, "text/html");
  const rows = doc.querySelectorAll(".board_table_list tbody tr");
  const localCommittees: LocalCommittee[] = [];

  rows.forEach((row: any) => {
    const localCommittee: LocalCommittee = {
      num: 0,
      category: "",
      title: "",
      roles: "",
      createdDate: "",
      department: "",
      link: "",
    };

    const columns = row.querySelectorAll("td");
    columns.forEach((col: any, index: number) => {
      switch (index) {
        case 0:
          localCommittee.num = col.textContent.trim();
          break;
        case 1:
          localCommittee.category = col.textContent.trim();
          break;
        case 2:
          localCommittee.title = col.textContent.trim();
          localCommittee.link = `https://www.daejeon.go.kr${col
            .querySelector("a")
            .getAttribute("href")}`;
          break;
        case 3:
          localCommittee.roles = col.textContent.trim();
          break;
        case 4:
          localCommittee.createdDate = col.textContent.trim();
          break;
        case 5:
          localCommittee.department = col.textContent.trim();
          break;
      }

      localCommittees.push(localCommittee);
    });
  });

  return localCommittees;
};
