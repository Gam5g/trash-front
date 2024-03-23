import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuUserSquare2 } from "react-icons/lu";
import { useForm } from "react-hook-form";
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

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://3.39.190.90/api/auth/sign-in",
        { accountName: data.id, password: data.password },
        {
          headers: { "Content-type": "application/json" },
        }
      );
      const token = response.data.token;
      saveToken(token);
      setIsLoggedIn(true);
      navigate("../../../");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // AxiosError를 처리
        console.error("Axios Error:", error.response);
        if (error.response) {
          // 응답이 있는 경우
          console.error("응답 데이터:", error.response.data);
          console.error("응답 상태 코드:", error.response.status);
        } else if (error.request) {
          // 요청은 보냈지만 응답이 없는 경우
          console.error("요청 데이터:", error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 오류가 발생한 경우
          console.error("오류를 발생시킨 요청 설정:", error.message);
        }
      } else {
        // 기타 오류 처리
        console.error("기타 오류 발생:", error.message);
      }
    }
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
