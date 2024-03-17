import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { VscCopilot } from "react-icons/vsc";
import { MdAlternateEmail } from "react-icons/md";
import { LuUserSquare2 } from "react-icons/lu";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import "../../App.css";
//https://velog.io/@easyhyun00/Spring-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Spring-React-DB-%EC%97%B0%EA%B2%B0
// 스프링-리액트-DB 연동
// 추가 필요사항 : 아이디 중복여부확인, 회원가입 데이터를 백엔드로 보내기(필수)

const RegisterForm = () => {
  const {
    register,
    watch,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      userId: 0,
    },
  });

  const onSubmit = (data) => {
    const newUserId = parseInt(data.userId) + 1;
    console.log(data);
    fetch(`url`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userId: newUserId,
        id: data.id,
        password: data.password,
        nickname: data.nickname,
        email: data.email,
        region: data.region,
        subregion: data.subRegion, // subregion인지 subRegion인지 확인 필요
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert(`회원가입 완료! 로그인 후 이용해주세요.`);
        navigate("../login");
      });
  };
  const password = useRef({});
  password.current = watch("password", "");

  const validatePassword = (value) => {
    if (value !== password.current) {
      return "비밀번호가 일치하지 않습니다.";
    }
    if (errors.passwordConfirm) {
      errors.passwordConfirm.message = "비밀번호가 일치하지 않습니다.";
    }
    return true;
  };

  const regions = [
    {
      name: "대구",
      subRegions: [
        "남구",
        "달서구",
        "달성군",
        "동구",
        "북구",
        "서구",
        "수성구",
        "중구",
      ],
    },
  ];
  const [passwordVisible, setPasswordVisible] = useState("");
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState("");

  const navigate = useNavigate();
  const NavigateToLogin = () => {
    navigate("../login");
  };
  const NavigateToMain = () => {
    navigate("../");
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };

  return (
    <div className="NotDrag">
      <div className="titleWrap"> 회원가입 </div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className="contentWrap">
          <div className="inputWrap">
            <LuUserSquare2 style={{ height: "30px" }} />
            <input
              type="text"
              name="id"
              className="inputContent"
              placeholder="아이디"
              {...register("id", {
                required: "아이디는 필수 입력입니다.",
                pattern: {
                  value: /^[a-zA-Z0-9-_]+$/,
                  message: "아이디 형식에 맞지 않습니다.",
                },
                minLength: {
                  value: 5,
                  message: "아이디는 최소 5자 이상입니다.",
                },
                maxLength: {
                  value: 12,
                  message: "아이디는 최대 12자 이하입니다",
                },
              })}
            />
          </div>
          <button className="loginbutton" onClick={NavigateToLogin}>
            아이디 중복확인
          </button>
          <p style={{ color: "red" }}>{errors.id?.message}</p>
          <div className="inputWrap">
            <RiLockPasswordLine style={{ height: "30px" }} />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className="inputContent"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
                pattern: {
                  value:
                    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-])[a-zA-Z0-9!@#$%^*+=-]+$/,
                  message:
                    "비밀번호는 알파벳과 숫자, 특수기호를 포함해야 합니다.",
                },
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상입니다.",
                },
                maxLength: {
                  value: 15,
                  message: "비밀번호는 최대 15자 이하입니다.",
                },
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
          <div className="inputWrap">
            <RiLockPasswordFill style={{ height: "30px" }} />
            <input
              type={passwordConfirmVisible ? "text" : "password"}
              name="password_confirm"
              className="inputContent"
              placeholder="비밀번호 확인"
              {...register("password_confirm", {
                required: "비밀번호 확인은 필수 입력입니다.",
                validate: validatePassword,
              })}
            />
            <div onClick={togglePasswordConfirmVisibility}>
              {passwordConfirmVisible ? (
                <AiFillEye style={{ height: "30px" }} />
              ) : (
                <AiFillEyeInvisible style={{ height: "30px" }} />
              )}
            </div>
          </div>
          <p style={{ color: "red" }}>{errors.password_confirm?.message}</p>
          <div className="inputWrap">
            <MdAlternateEmail style={{ height: "30px" }} />
            <input
              type="text"
              name="email"
              className="inputContent"
              placeholder="이메일"
              {...register("email", {
                required: "이메일은 필수 입력입니다.",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "올바른 이메일 형식이 아닙니다.",
                },
              })}
            />
          </div>
          <button className="loginbutton" onClick={NavigateToLogin}>
            이메일 인증
          </button>
          <p style={{ color: "red" }}>{errors.email?.message}</p>
          <div className="inputWrap">
            <VscCopilot style={{ height: "30px" }} />
            <input
              type="text"
              name="nickname"
              className="inputContent"
              placeholder="닉네임"
              {...register("nickname", {
                required: "닉네임은 필수 입력입니다.",
                pattern: {
                  value: /^[A-za-z0-9가-힣]+$/,
                  message: "닉네임 형식에 맞지 않습니다.",
                },
                minLength: {
                  value: 2,
                  message: "닉네임은 최소 2자 이상입니다.",
                },
                maxLength: {
                  value: 8,
                  message: "닉네임은 최대 8자 이상입니다.",
                },
              })}
            />
          </div>
          <button className="loginbutton" onClick={NavigateToLogin}>
            닉네임 중복확인
          </button>
          <p style={{ color: "red" }}>{errors.nickname?.message}</p>
          <select
            className="sort-container"
            {...register("region", { required: "지역을 선택해주세요." })}
          >
            <option value="">지역 선택</option>
            {regions.map((region, index) => (
              <option key={index} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
          <p style={{ color: "red" }}>{errors.region?.message}</p>
          {watch("region") && (
            <>
              <select
                id="subRegion"
                name="subRegion"
                className="sort-container"
                {...register("subRegion", {
                  required: "시군구를 선택해주세요.",
                })}
              >
                <option value="">시군구 선택</option>
                {regions
                  .find((item) => item.name === watch("region"))
                  .subRegions.map((subregion, index) => (
                    <option key={index} value={subregion}>
                      {subregion}
                    </option>
                  ))}
              </select>
              <p style={{ color: "red" }}>{errors.subRegion?.message}</p>
            </>
          )}
        </div>
        <button
          className="registerbutton"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          등록하기
        </button>
        <button className="cancelbutton" onClick={NavigateToMain}>
          돌아가기
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
