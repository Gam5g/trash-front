import React from "react";
import { useNavigate } from "react-router-dom";
import CommunityList from "../../../components/CommunityList";
import { BunriPosts } from "./BunriPosts";
import "../../../Button.css";

const CommunityBunriList = () => {
  const navigate = useNavigate();
  const navigateToNanum = () => {
    navigate(`/community-nanum/`);
  };
  return (
    <div>
      <h1>분리수거 게시글 목록</h1>
      <div>
        <button onClick={navigateToNanum} className="unactiveBtn">
          나눔
        </button>
        <button className="activeBtn">분리수거</button>
      </div>
      <CommunityList posts={BunriPosts} postType="bunri" />
    </div>
  );
};

export default CommunityBunriList;
