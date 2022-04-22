import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './create.css';

function EditPost() {
    const [form, setForm] = useState({
        title:'',
        content:'',
        posts:[]
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/post/${params.id.toString()}`);

            if(!response.ok) {
                const message = `An error has occured: ${response.statusText}`
                window.alert(message)
                return;
            }

            const post = await response.json();
            if(!post) {
                window.alert(`Post with id ${id} not found`)
                navigate('/');
                return;
            }
            setForm(post);
        }
        fetchData();
        return;
    },[params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const editedPost ={
            title: form.title,
            content: form.content,
        }
        axios.post(`http://localhost:5000/update-post/${params.id}`,editedPost)
        navigate('/')
    }
    
    return (
        <div className="create__container">
            <div className="create__main">
            <div className="create__sign">

            <h3>Update Post</h3>

            <form onSubmit={onSubmit}>

                <input className='create__input' type='text' id='title' 
                value={form.title} 
                onChange={(e) => updateForm({title:e.target.value})}/>
                
                <textarea className='create__area' type='text' id='content' 
                value={form.content} 
                onChange={(e) => updateForm({content:e.target.value})}/>
                
                <button className='create__btn' type='submit'>Update Post</button>

            </form>
            </div>
            </div>
        </div>
    );
}

export default EditPost;