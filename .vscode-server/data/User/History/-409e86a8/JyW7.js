import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FindID = () => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("../login");
  };
  return (
    <div>
      <h2>아이디 찾기</h2>
      <div>
        <input
          type="text"
          name="id"
          placeholder="아이디"
          {...register("id", {
            required: "아이디를 입력하세요.",
          })}
        />
      </div>
      <div>
        <input
          type="text"
          name="email"
          placeholder="이메일"
          {...register("email", {
            required: "이메일을 입력하세요.",
          })}
        />
      </div>
      <button className="loginbutton" onClick={navigateToLogin}>
        로그인
      </button>
    </div>
  );
};

export default FindID;
