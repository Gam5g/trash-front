import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuUserSquare2 } from "react-icons/lu";
import { useForm } from "react-hook-form";
import "../../App.css";

//https://velog.io/@easyhyun00/Spring-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Spring-React-DB-%EC%97%B0%EA%B2%B0
// 스프링-리액트-DB 연동
// 필요시 카카오 연동 로그인 또는 네이버 연동 로그인도 필요할 듯.

const LoginForm = () => {
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const [passwordVisible, setPasswordVisible] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const NavigateToRegister = () => {
    navigate("../register");
  };

  const onSubmit = (data) => {
    console.log(data);
    setIsLoggedIn(true);
  };

  return (
    <div className="NotDrag">
      <div className="titleWrap"> 로그인 </div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="contentWrap">
          <div className="inputWrap">
            <div style={{ height: "100px" }}>
              <LuUserSquare2 />
            </div>
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
          <p style={{ color: "red" }}>{errors.id?.message}</p>
          <div className="inputWrap">
            <RiLockPasswordLine />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className="inputContent"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
              })}
            />
            <div onClick={togglePasswordVisibility}>
              {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
          <p style={{ color: "red" }}>{errors.password?.message}</p>
          <button
            className="loginbutton"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            로그인
          </button>
          <button className="registerbutton" onClick={NavigateToRegister}>
            회원가입
          </button>
          <div></div>
          <Link to="/find-id" style={{ color: "gray" }}>
            아이디 찾기
          </Link>
          <div></div>
          <Link to="/find-password" style={{ color: "gray" }}>
            비밀번호 찾기
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
