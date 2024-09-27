import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { VscCopilot } from "react-icons/vsc";
import { MdAlternateEmail } from "react-icons/md";
import { LuUserSquare2 } from "react-icons/lu";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import AuthToken from "./AuthToken";
import "../../App.css";

const RegisterForm = () => {
  const [checkID, setCheckID] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkNickname, setCheckNickname] = useState(false);

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

  const onSubmit = () => {
    if (!checkID) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }
    if (!checkEmail) {
      alert("이메일 중복 확인을 해주세요.");
      return;
    }
    if (!checkNickname) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    if (agreed) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude);
          console.log(longitude);
          submitForm(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
          submitForm();
        },
        { enableHighAccuracy: true }
      );
    } else {
      submitForm();
    }
  };

  const checkDuplicate = async (value, type) => {
    if (type === "email" && errors.email) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (type === "id" && errors.id) {
      alert("아이디 형식이 올바르지 않습니다.");
      return;
    }
    if (type === "nickname" && errors.nickname) {
      alert("닉네임 형식이 올바르지 않습니다.");
      return;
    }
    const url = `/account/duplicate-test/${type}`;
    await AuthToken.post(
      url,
      {
        duplicate: value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((result) => {
        alert(result);
        if (
          result ===
          `사용가능한 ${type === "id" ? "아이디" : type === "nickname" ? "닉네임" : "이메일"} 입니다.`
        ) {
          if (type === "id") {
            setCheckID(true);
          } else if (type === "nickname") {
            setCheckNickname(true);
          } else {
            setCheckEmail(true);
          }
        }
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  const submitForm = async (latitude = null, longitude = null) => {
    const formData = {
      id: watch("id"),
      password: watch("password"),
      email: watch("email"),
      nickname: watch("nickname"),
      region: watch("region"),
      latitude,
      longitude,
    };
    await AuthToken.post(
      "/auth/sign-up",
      {
        accountName: formData.id,
        password: formData.password,
        email: formData.email,
        nickname: formData.nickname,
        region: formData.region,
        latitude: formData.latitude,
        longitude: formData.longitude,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((result) => {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        console.log("결과:", result);
        navigate("../sign-in");
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  const password = useRef({});
  password.current = watch("password", "");

  const validatePassword = (value) => {
    return value === password.current || "비밀번호가 일치하지 않습니다.";
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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [agreed, setAgreed] = useState(false);
  //const [position, setPosition] = useState(null);

  const navigate = useNavigate();

  const NavigateToMain = () => {
    navigate("../");
  };

  return (
    <div className="NotDrag">
      <div className="titleWrap"> 회원가입 </div>
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
                required: "아이디는 필수 입력입니다.",
                pattern: {
                  value: /^[a-zA-Z0-9-_]+$/,
                  message: "아이디 형식에 맞지 않습니다.",
                },
                minLength: {
                  value: 5,
                  message: "아이디는 최소 5글자입니다.",
                },
                maxLength: {
                  value: 12,
                  message: "아이디는 최대 12글자입니다",
                },
                validate: {
                  notAdmin: (value) =>
                    value !== "admin" || "불가능한 아이디입니다.",
                },
              })}
            />
          </div>
          <button
            className="write-green-button"
            style={{ marginTop: "5px", width: "360px" }}
            onClick={() => checkDuplicate(watch("id"), "id")}
          >
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
                  message: "비밀번호는 최소 8글자입니다.",
                },
                maxLength: {
                  value: 15,
                  message: "비밀번호는 최대 15글자입니다.",
                },
              })}
            />
            <div onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? (
                <AiFillEye style={{ height: "30px", cursor: "pointer" }} />
              ) : (
                <AiFillEyeInvisible
                  style={{ height: "30px", cursor: "pointer" }}
                />
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
            <div
              onClick={() => setPasswordConfirmVisible(!passwordConfirmVisible)}
            >
              {passwordConfirmVisible ? (
                <AiFillEye style={{ height: "30px", cursor: "pointer" }} />
              ) : (
                <AiFillEyeInvisible
                  style={{ height: "30px", cursor: "pointer" }}
                />
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
          <button
            className="write-green-button"
            style={{ marginTop: "5px", width: "360px" }}
            onClick={() => checkDuplicate(watch("email"), "email")}
          >
            이메일 중복확인
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
                  message: "닉네임은 최소 2글자입니다.",
                },
                maxLength: {
                  value: 8,
                  message: "닉네임은 최대 8글자입니다.",
                },
              })}
            />
          </div>
          <button
            className="write-green-button"
            style={{ marginTop: "5px", width: "360px" }}
            onClick={() => checkDuplicate(watch("nickname"), "nickname")}
          >
            닉네임 중복확인
          </button>
          <p style={{ color: "red" }}>{errors.nickname?.message}</p>
          <div>
            <label for="agree" style={{ marginTop: "20px" }}>
              <input
                type="checkbox"
                name="agree"
                id="agree"
                onChange={(e) => setAgreed(e.target.checked)}
              />
              위치확인 동의
            </label>
          </div>
          {!agreed && (
            <div>
              <select
                className="sort-container"
                style={{ marginTop: "20px" }}
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
          )}
        </div>
        <div className="button-container">
          <button
            className="submitbutton"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            완료
          </button>
          <button className="cancelbutton" onClick={NavigateToMain}>
            돌아가기
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
