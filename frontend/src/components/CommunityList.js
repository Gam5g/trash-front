import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paging from "../container/pages/Community/Paging";
import "../Button.css";

const CommunityList = ({ posts, title, postType, Btn }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("page");
  const [searchBy, setSearchBy] = useState("title");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const NavigateToWrite = () => {
    navigate(`/community-${postType}/write`);
  };

  const navigateToNanum = () => {
    navigate(`/community-nanum/`);
  };

  const navigateToBunri = () => {
    navigate(`/community-bunri/`);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    navigate(`/community/${postType}/${post.id}`);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleSearch = () => {
    const filtered = posts.filter((post) => {
      if (searchBy === "title") {
        return post.title.includes(query);
      } else if (searchBy === "author") {
        return post.author.includes(query);
      }
      return false;
    });
    if (filtered.length === 0) {
      window.confirm("검색 결과가 없습니다.");
    } else {
      setSearchResults(filtered);
      setPage(1);
    }
  };

  const sortedPostsByCriteria = (posts) => {
    return [...posts].sort((a, b) => {
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
  };

  const paginatedPosts = sortedPostsByCriteria(
    searchResults.length > 0 ? searchResults : posts
  ).slice((page - 1) * 10, page * 10);

  return (
    <>
      <div className="NotDrag" style={{ paddingTop: "50px" }}>
        <h1>{title} 게시글 목록</h1>
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
              className="community-search-input"
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button className="searchbutton" onClick={handleSearch}>
              검색
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={navigateToNanum}
            className={Btn === "activeBtn" ? "activeBtn" : "unactiveBtn"}
          >
            나눔
          </button>
          <button
            onClick={navigateToBunri}
            className={Btn === "activeBtn" ? "activeBtn" : "unactiveBtn"}
          >
            분리수거
          </button>
        </div>
        {paginatedPosts.length > 0 && (
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
              {paginatedPosts.map((post) => (
                <tr key={post.id} onClick={() => handlePostClick(post)}>
                  <td>{post.id}</td>
                  <td style={{ maxWidth: "250px" }}>
                    {post.title.length > 20
                      ? post.title.slice(0, 20) + "..."
                      : post.title}
                  </td>
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
          totalItemsCount={
            searchResults.length > 0 ? searchResults.length : posts.length
          }
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CommunityList;
