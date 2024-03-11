import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Community = ({id, title, author, views, date, likes}) => {
    const deletePost = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete(`//localhost:8080/community/${idx}`).then((res)=>{
                alert('삭제되었습니다.');
                Navigate('/community')
            })
        }
    }
    return (
        <div>
            <div>
                <h2>{title}</h2>
                <h5>{views}</h5>

            </div>
            <div>
                <button onClick={deletePost}>삭제</button>
                <button onClick={navigateToList}>목록</button>
            </div>
        </div>
    )
}
export default Community;