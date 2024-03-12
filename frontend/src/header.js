import React, { useState } from "react";
import "./style.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <RxHamburgerMenu className="hamburger-menu" />
          </div>
          <div className="mobile-menu">
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
                  <a style={{ color: "darkgray" }}>커뮤니티</a>
                </li>
                <li>
                  <a href="/community-nanum">나눔</a>
                </li>
                <li>
                  <a href="/community-bunri">분리수거</a>
                </li>
                <li>
                  <a href="/medicine-location">폐의약품 위치</a>
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
        <nav className={"navbar__menu"} style={{ fontFamily: "" }}>
          <ul>
            <li>
              {isLoggedIn ? (
                <a href="/">로그아웃</a>
              ) : (
                <a href="/login">로그인</a>
              )}
            </li>
            <span className="separator">|</span>
            <li>
              <a style={{ color: "darkgray" }}>커뮤니티</a>
            </li>
            <li>
              <a href="/community-nanum">나눔</a>
            </li>
            <li>
              <a href="/community-bunri">분리수거</a>
            </li>
            <span className="separator">|</span>
            <li>
              <a href="/medicine-location">폐의약품 위치</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
