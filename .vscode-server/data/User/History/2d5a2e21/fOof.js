import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Community.css";
import { Posts } from "./posts";
import Paging from "./Paging";

const CommunityList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("page");
  const [searchBy, setSearchBy] = useState("title");
  const [page, setNowPage] = useState(1);
  const navigate = useNavigate();

  const NavigateToWrite = () => {
    navigate("/community/write");
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    navigate(`/community/${post.id}`);
  };

  const handlePageChange = (page) => {
    setNowPage(page);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleSearch = (e) => {
    const filteredPosts = Posts.filter((post) => {
      if (searchBy === "title") {
        return post.title.includes(query);
      } else if (searchBy === "author") {
        return post.author.includes(query);
      }
      return false;
    });
    if (filteredPosts.length === 0) {
      window.confirm("검색 결과가 없습니다.");
    }
    setFilteredPosts(filteredPosts);
    setSortedPosts(filteredPosts);
    setSearchResults(filteredPosts);
    setNowPage(1);
  };

  const sortedPostsByCriteria = [...Posts].sort((a, b) => {
    switch (sortBy) {
      case "page":
        return b.id - a.id;
      case "date":
        return new Date(a.date) - new Date(b.date);
      case "likes":
        return b.likes - a.likes;
      case "views":
        return b.views - a.views;
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="NotDrag">
        <h1>게시글 목록</h1>
        <div className="search-controls">
          <select
            className="sort-container"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="page">페이지 번호순 정렬</option>
            <option value="likes">추천순 정렬</option>
            <option value="views">조회순 정렬</option>
            <option value="date">작성날짜순 정렬</option>
          </select>
          <div className="search-container">
            <select value={searchBy} onChange={handleSearchChange}>
              <option value="title">제목</option>
              <option value="author">글쓴이</option>
            </select>
            <input
              type="text"
              placeholder="입력"
              value={query}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="searchbutton" onClick={handleSearch}>
              검색
            </button>
          </div>
        </div>
        {searchResults.length >= 0 && (
          <table className="table-container">
            <thead>
              <tr>
                <th>글 번호</th>
                <th>제목</th>
                <th>글쓴이</th>
                <th>조회수</th>
                <th>추천수</th>
                <th>작성날짜</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length > 0
                ? searchResults
                    .sort((a, b) => {
                      switch (sortBy) {
                        case "page":
                          return b.id - a.id;
                        case "date":
                          return new Date(a.date) - new Date(b.date);
                        case "likes":
                          return b.likes - a.likes;
                        case "views":
                          return b.views - a.views;
                        default:
                          return 0;
                      }
                    })
                    .slice((page - 1) * 10, page * 10)
                    .map((post) => (
                      <tr key={post.id} onClick={() => handlePostClick(post)}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.author}</td>
                        <td>{post.views}</td>
                        <td>{post.likes}</td>
                        <td>{post.date}</td>
                      </tr>
                    ))
                : sortedPostsByCriteria
                    .slice((page - 1) * 10, page * 10)
                    .map((post) => (
                      <tr key={post.id} onClick={() => handlePostClick(post)}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.author}</td>
                        <td>{post.views}</td>
                        <td>{post.likes}</td>
                        <td>{post.date}</td>
                      </tr>
                    ))}
            </tbody>
          </table>
        )}
        {isLoggedIn ? (
          <button className="writebutton" onClick={NavigateToWrite}>
            글쓰기
          </button>
        ) : (
          <button
            className="disabled-write-button"
            onLoginSuccess={handleLoginSuccess}
          >
            글쓰기
          </button>
        )}
        <Paging
          totalItemsCount={Posts.length}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CommunityList;
