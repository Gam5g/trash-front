import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Posts } from "./posts";
const CommunityDetail = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`//localhost:8080/community/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);
  const deletePost = async (Posts) => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await axios.delete(`//localhost:8080/community/${id}`).then((res) => {
        alert("삭제되었습니다.");
        navigate("/community");
      });
    }
  };
  const navigateToList = () => {
    navigate("/community");
  };
  console.log(Posts.title);
  return (
    <div>
      {Posts && (
        <div>
          <h2>{Posts.title}</h2>
          <h3>{Posts.author}</h3>
          <p>{Posts.content}</p>
          <p>{Posts.views}</p>
          <p>{Posts.date}</p>
          <p>{Posts.likes}</p>
        </div>
      )}
      <div>
        <button onClick={deletePost}>삭제</button>
        <button onClick={navigateToList}>목록</button>
      </div>
    </div>
  );
};
export default CommunityDetail;
