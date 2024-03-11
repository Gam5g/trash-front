import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { LuUserSquare2 } from "react-icons/lu";
import { VscCopilot } from "react-icons/vsc";

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
      <div className="inputWrap">
        <LuUserSquare2 style={{ height: "30px" }} />
        <input
          type="text"
          name="id"
          className="inputContent"
          placeholder="아이디"
          {...register("id", {
            required: "아이디를 입력하세요.",
          })}
        />
      </div>
      <div className="inputWrap">
        <VscCopilot style={{ height: "30px" }} />
        <input
          type="text"
          name="nickname"
          className="inputContent"
          placeholder="닉네임"
          {...register("nickname", {
            required: "닉네임을 입력하세요.",
          })}
        />
      </div>

      <button className="loginbutton" onClick={navigateToLogin}>
        로그인
      </button>
      <Link to="/find-password" style={{ color: "gray" }}>
        비밀번호 찾기
      </Link>
    </div>
  );
};

export default FindID;
