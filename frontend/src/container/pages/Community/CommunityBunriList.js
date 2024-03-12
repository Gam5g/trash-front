import React from "react";
import CommunityList from "./CommunityList";
import { BunriPosts } from "./BunriPosts";

const CommunityBunriList = () => {
  return (
    <CommunityList
      posts={BunriPosts}
      title="분리수거"
      postType="bunri"
      Btn="activeBtn"
    />
  );
};

export default CommunityBunriList;
