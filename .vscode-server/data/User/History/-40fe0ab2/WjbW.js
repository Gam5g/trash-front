import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommunityList from "./CommunityList";

const CommunityContainer = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`//localhost:8080/community`);
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPost();
    }, []);

    return <CommunityList posts={posts} />
}
export default CommunityContainer;