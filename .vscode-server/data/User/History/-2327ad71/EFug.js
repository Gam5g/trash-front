import React from "react";
import { useParams } from "react-router-dom";
import { Trash } from "./trash";

function SearchDetailForm() {
  const { query } = useParams();

  const searchResult = Trash.filter((item) => item.name === query)[0];

  return (
    <div>
      {searchResult ? (
        <div>
          <h2>{searchResult.name}</h2>
          {/* 검색 결과에 대한 추가 정보 표시 */}
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
