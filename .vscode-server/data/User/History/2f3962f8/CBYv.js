import React, { useState } from "react";
import "./style.css";
import { useMediaQuery } from "react-responsive";
import {isLoggedIn, setIsLoggedIn} from "./container/pages/LoginForm";

const Header = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [width, setWidth] = useState(0);

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setWidth(0);
  };

  return (
    <header>
      <div className="logo" onClick={handleLogoClick}>
        <img src="/images/logo.png" alt="로고" style={{ cursor: "pointer" }} />
      </div>
      {isMobile ? (
        <>
          <div
            className="menu-icon"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setWidth(isMenuOpen ? 0 : 250); // 토글되도록 너비 설정
            }}
            style={{ cursor: "pointer" }}
          >
            ☰
          </div>
          <div className="mobile-menu hide">
            <div className="side-menu" style={{ width: width }}>
              <ul className="mobile-side">
                <img
                  src="/images/logo.png"
                  alt="로고"
                  style={{ width: "150px", height: "auto" }}
                />
                <li>
                  {isLoggedIn ? (
                    <a href="/">로그아웃</a>
                  ) : (
                    <a href="/login">로그인</a>
                  )}
                </li>
                <li>
                  <a href="/medicine-location">폐의약품 위치</a>
                </li>
                <li>
                  <a href="/community">커뮤니티</a>
                </li>
              </ul>
            </div>
            <div
              className={`side-menu-overlay ${isMenuOpen ? "show" : ""}`}
              onClick={closeMenu}
            ></div>
          </div>
        </>
      ) : (
        <nav className={"navbar__menu"}>
          <ul>
            <li>
              {isLoggedIn ? (
                <a href="/">로그아웃</a>
              ) : (
                <a href="/login">로그인</a>
              )}
            </li>
            <li>
              <a href="/medicine-location">폐의약품 위치</a>
            </li>
            <li>
              <a href="/community">커뮤니티</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
