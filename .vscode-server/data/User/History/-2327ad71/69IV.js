import React from "react";
import { useParams } from "react-router-dom";
import { Trash } from "./trash";

function SearchDetailForm() {
  // URL의 쿼리 매개변수를 가져옴
  const { query } = useParams();

  const searchResult = Trash.find((item) => item.name === query);
  console.log(query);
  console.log(searchResult);
  return (
    <div>
      {searchResult ? (
        <div>
          <h2>{searchResult.name}</h2>
          <p>큰 분류: {searchResult.big}</p>
          <p>작은 분류: {searchResult.small}</p>
          <p>규칙: {searchResult.rules}</p>
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
