import React from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

const CommunityDetail = ({community}) => {
    const navigate = useNavigate();
    const deletePost = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete(`//localhost:8080/community/${id}`).then((res)=>{
                alert('삭제되었습니다.');
                navigate('/community')
            })
        }
    }
    const navigateToList = () => {
        navigate('/community');
    }
    return (
        <div>
            <div>
                <h2>{community.title}</h2>
                <h3>{community.author}</h3>
                <p>{community.content}</p>
                <p>{community.views}</p>
                <p>{community.date}</p>
                <p>{community.likes}</p>
            </div>
            <div>
                <button onClick={deletePost}>삭제</button>
                <button onClick={navigateToList}>목록</button>
            </div>
        </div>
    )
}
export default CommunityDetail;