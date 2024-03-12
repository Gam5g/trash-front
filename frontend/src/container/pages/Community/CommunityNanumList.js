import React from "react";
import CommunityList from "./CommunityList";
import { NanumPosts } from "./NanumPosts";

const CommunityNanumList = () => {
  return (
    <CommunityList
      posts={NanumPosts}
      title="나눔"
      postType="nanum"
      Btn="activeBtn"
    />
  );
};

export default CommunityNanumList;
