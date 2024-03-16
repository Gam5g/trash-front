import React from "react";
import { useNavigate } from "react-router-dom";
import CommunityList from "../../../components/CommunityList";
import { NanumPosts } from "./NanumPosts";
import "../../../Button.css";

const CommunityNanumList = () => {
  const navigate = useNavigate();
  const navigateToBunri = () => {
    navigate(`/community-bunri/`);
  };

  return (
    <div>
      <h1>나눔 게시글 목록</h1>
      <div>
        <button className="activeBtn">나눔</button>
        <button onClick={navigateToBunri} className="unactiveBtn">
          분리수거
        </button>
      </div>
      <CommunityList posts={NanumPosts} postType="nanum" />
    </div>
  );
};

export default CommunityNanumList;
