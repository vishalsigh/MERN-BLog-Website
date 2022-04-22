import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../posts/create.css';

function Create() {
    const [form, setForm] = useState({
        title:'',
        content:'',
    });

    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const newPost ={...form}
        axios.post('http://localhost:5000/add-post',newPost)
        navigate('/')
    }
    
    return (
        <div className="create__container">
            <div className="create__main">
            <div className="create__sign">
            <h3>Create Post</h3>

            <form onSubmit={onSubmit}>
                
                <input className='create__input' type='text' id='title' placeholder='Type your Title!'
                value={form.title} 
                onChange={(e) => updateForm({title:e.target.value})}/>

                <textarea className='create__area' type='text' id='content' placeholder='Type whatever is on your mind ...'
                value={form.content} 
                onChange={(e) => updateForm({content:e.target.value})}/>

                <button className='create__btn' type='submit'>Create Post</button>
            
            </form>
            </div>
            </div>
        </div>
    );
}

export default Create;