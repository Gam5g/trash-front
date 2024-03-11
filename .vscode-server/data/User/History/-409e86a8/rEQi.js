import React from "react";
import { useNavigate } from "react-router-dom";

const FindId = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Find ID</h2>
      <button className="loginbutton">로그인</button>
    </div>
  );
};

export default FindId;
