import React from "react";
import CompareForm from "../../components/CompareForm";

const SearchEditForm = () => {
  return (
    <div className="search-edit-container">
      <div className="modified-rules" style={{ userSelect: "none" }}>
        <h1>정보 수정에 관한 규칙</h1>
        <ul>
          <li>올바르지 않은 정보를 적는 것은 금지합니다.</li>
          <li>
            정당한 사유 없이 배출 내용 전부를 삭제하는 것은 내용 훼손이 되므로
            주의하시기 바랍니다.
          </li>
          <li className="li-red">수정 요청은 관리자가 승인하면 반영됩니다.</li>
        </ul>
      </div>
      <CompareForm type="edit" />
    </div>
  );
};

export default SearchEditForm;
