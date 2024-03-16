import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../container/pages/Community/Detail.css";

const CommunityDetail = ({ posts, postsType }) => {
  const location = useLocation();
  const id = parseInt(location.pathname.split("/").pop());
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const foundPost = posts.find((post) => post.id === id);
        setPost(foundPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id, posts]);

  const deletePost = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      const updatedPosts = posts.filter((post) => post.id !== id);
      // 삭제 후 목록으로 이동
      navigate("/community");
      alert("삭제되었습니다.");
    }
  };

  return (
    <div className="container">
      {post && (
        <div className="post">
          <h2>{post.title}</h2>
          <h3>작성자: {post.author}</h3>
          <p>{post.content}</p>
          <div className="info">
            <p>조회수: {post.views}</p>
            <p>작성일: {post.date}</p>
            <p>좋아요: {post.likes}</p>
          </div>
        </div>
      )}
      <div className="buttons">
        <button className="deleteButton" onClick={deletePost}>
          삭제
        </button>
        <button
          className="listButton"
          onClick={() => navigate(`/community-${postsType}`)}
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default CommunityDetail;
