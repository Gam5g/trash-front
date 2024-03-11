import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Community = ({id, title, author, views, date, likes}) => {
    const navigate = useNavigate();
    const deletePost = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete(`//localhost:8080/community/${idx}`).then((res)=>{
                alert('삭제되었습니다.');
                Navigate('/community')
            })
        }
    }
    const navigateToList = () => {
        navigate('/community');
    }
    return (
        <div>
            <div>
                <h2>{title}</h2>
                <h3>{author}</h3>
                <h5>{views}</h5>
                <h5>{date}</h5>
                <h5>{likes}</h5>
            </div>
            <div>
                <button onClick={deletePost}>삭제</button>
                <button onClick={navigateToList}>목록</button>
            </div>
        </div>
    )
}
export default Community;