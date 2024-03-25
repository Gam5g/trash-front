import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuUserSquare2 } from "react-icons/lu";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../App.css";
import "../../Button.css";

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

  const onSubmit = (e, formData) => {
    e.preventDefault();
    axios
      .post(
        "http://3.39.190.90/api/auth/sign-in",
        {
          accountName: formData.id,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("Authorization", res.access_token);
        navigate("/");
      });
  };

  const saveToken = (token) => {
    localStorage.setItem("token", token);
  };

  return (
    <div className="NotDrag">
      <div className="titleWrap"> 로그인 </div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="contentWrap">
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
          <p style={{ color: "red" }}>{errors.id?.message}</p>
          <div className="inputWrap">
            <RiLockPasswordLine style={{ height: "30px" }} />
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
              {passwordVisible ? (
                <AiFillEye style={{ height: "30px" }} />
              ) : (
                <AiFillEyeInvisible style={{ height: "30px" }} />
              )}
            </div>
          </div>
          <p style={{ color: "red" }}>{errors.password?.message}</p>
          <div className="login-container">
            <button
              className="loginbutton"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              로그인
            </button>
          </div>
          <div></div>
          <Link
            to="/find-id"
            style={{
              color: "gray",
              margin: "20px 10px 0",
            }}
          >
            아이디 찾기
          </Link>
          <Link
            to="/find-password"
            style={{
              color: "gray",
              margin: "20px 10px 0",
            }}
          >
            비밀번호 찾기
          </Link>
          <Link
            to="../api/auth/sign-up"
            style={{
              color: "gray",
              margin: "20px 10px 0",
            }}
          >
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
