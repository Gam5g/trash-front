import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CommunityDetail = ({post}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const deletePost = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete(`//localhost:8080/community/${post.id}`).then((res)=>{
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
                <h2>{post.title}</h2>
                <h3>{post.author}</h3>
                <p>{post.content}</p>
                <p>{post.views}</p>
                <p>{post.date}</p>
                <p>{post.likes}</p>
            </div>
            <div>
                <button onClick={deletePost}>삭제</button>
                <button onClick={navigateToList}>목록</button>
            </div>
        </div>
    )
}
export default CommunityDetail;