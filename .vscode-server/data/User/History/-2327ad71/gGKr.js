import React from "react";
import { useLocation } from "react-router-dom";
import { Trash } from "./trash";
import { MedicineMap } from "./MedicineMap";

function SearchDetailForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const searchResult = Trash.find((item) => item.name === query);

  return (
    <div>
      {searchResult ? (
        <div>
          <h2>{searchResult.name}</h2>
          <p>큰 분류: {searchResult.big}</p>
          <p>작은 분류: {searchResult.small}</p>
          <p>규칙: {searchResult.rules}</p>
          {searchResult.name === "폐의약품" && <MedicineMap />}
        </div>
      ) : (
        <div>
          <h2>검색 결과가 없습니다.</h2>
          {/* 추가적인 동작이나 안내 메시지를 표시할 수 있음 */}
        </div>
      )}
    </div>
  );
}

export default SearchDetailForm;
