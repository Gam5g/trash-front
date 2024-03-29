import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuUserSquare2 } from "react-icons/lu";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuthDispatch } from "../../AuthContext";
import "../../App.css";
import "../../Button.css";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAuthDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async () => {
    const formData = {
      id: watch("id"),
      password: watch("password"),
    };
    setIsLoading(true);
    try {
      const response = await axios.post(
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
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const { accessToken, refreshToken } = response.data.result;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      dispatch({ type: "LOGIN" });
      navigate("../");
    } catch (error) {
      console.error("에러:", error);
      if (error.response && error.response.status === 403) {
        console.error("회원정보가 일치하지 않습니다.");
      } else {
        console.error("네트워크 응답이 올바르지 않습니다.");
      }
    } finally {
      setIsLoading(false);
    }
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
            <button className="loginbutton" type="submit" disabled={isLoading}>
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
