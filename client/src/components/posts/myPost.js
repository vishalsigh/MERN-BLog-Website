import axios from "axios";
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

    <div className="card__footer">
       <h4> <Link to={`/EditPost/${props.post._id}`}>Edit</Link> </h4>
       <button className="cardbtn " onClick={()=>{props.deletePost(props.post._id);}}>Delete</button> 
    </div>
</div>
);
export default function MyPost() {
    const [posts, setPosts] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getPosts() {
            const response = await axios.get(`http://localhost:5000/mypost/`);
            
            const posts = await response.data;
            setPosts(posts);
        }

        getPosts();
        return;
    },[posts.length]);

    // This method will delete a record
    async function deletePost(id) {
        await axios.delete(`http://localhost:5000/delete-post/${id}`);
        const newPosts = posts.filter((el) => el._id !== id);
        setPosts(newPosts);
    }

    // This method will map out the records on the table
    function postList() {
        return posts.map((post) => {
            return (
                <Post
                post={post}
                deletePost={() => deletePost(post._id)}
                key={post._id}
                />
            );
        });
    }

    return(
        <div className='container'>
            {postList()}
        </div>
    );
}