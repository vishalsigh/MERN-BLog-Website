import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import '../posts/post.css';

const Post = (props) => (
    <div className="card">
        <div className="card__body">
            <h4>{props.post.title}</h4>
            <p>{props.post.content.substring(0, 100) + '...'}</p>
            <Link to={`/ReadPost/${props.post._id}`}>Read More</Link>

        </div>
    </div>

);
export default function PostList() {
    const [posts, setPosts] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getPosts() {
            const response = await fetch(`http://localhost:5000/get-post/`);
            // console.log(response);
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const posts = await response.json();
            setPosts(posts);
        }

        getPosts();
        return;
    },[posts.length]);


    // This method will map out the records on the table
    function postList() {
        return posts.map((post) => {
            return (
                <Post
                post={post}
                key={post._id}
                />
            );
        });
    }

    return(
        <div className="container">
            
            {postList()}
        
        </div>
    );
}