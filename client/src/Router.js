import React,{useContext} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from "./components/layout/Navbar";
import AuthContext from "./components/context/AuthContext";
import PostList from "./components/posts/PostList";
import EditPost from "./components/posts/EditPost";
import Create from "./components/posts/create";
import MyPost from "./components/posts/myPost";
import ReadPost from "./components/posts/readPost";

function Router() {
    const {loggedIn} = useContext(AuthContext);

    return(
        <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element = {<PostList />} />
            {loggedIn === false && (
                <>
                <Route path="/register" element = {<Register />} />
                <Route path="/login" element = {<Login />} />
                <Route path="/ReadPost/:id" element = {<ReadPost />} />

                </>
            )}
            {loggedIn === true && (
                <>
                <Route path="/EditPost/:id" element = {<EditPost />} />
                <Route path="/ReadPost/:id" element = {<ReadPost />} />
                <Route path="/create" element = {<Create />} />
                <Route path="/myPost" element = {<MyPost />} />
                </>
            )}
        </Routes>
        </BrowserRouter>
    )
}

export default Router;