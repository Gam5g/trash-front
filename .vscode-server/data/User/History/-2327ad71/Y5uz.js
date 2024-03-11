import React from "react";
import { useLocation } from "react-router-dom";
import { Trash } from "./trash";

function SearchDetailForm() {
  // useLocation 훅을 사용하여 현재 URL을 가져옴
  const location = useLocation();

  // URLSearchParams 객체를 사용하여 쿼리 매개변수를 파싱함
  const queryParams = new URLSearchParams(location.search);

  // URL의 'query' 쿼리 매개변수 값을 가져옴
  const query = queryParams.get("query");

  // Trash 배열에서 해당하는 쓰레기 정보를 찾음
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
