import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../auth/sign.css';

export default function Login() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const{getLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        try {
            const newPerson = {...form};
            await axios.post('http://localhost:5000/login', newPerson);
            await getLoggedIn();
            navigate('/');

        } catch (error) {
            console.log(error);
        }


    }
return (
    <div className="blog__container">
    <div className='blog__main'>
        <div className='blog__sign'>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
            
                <input className='form__input' 
               type='email' id='email' value={form.email} placeholder='Email'
                onChange={(e)=>updateForm({email: e.target.value})}
               /> 
            

                <input className='form__input'
               type='password' id='password' value={form.password} placeholder='Password'
               onChange={(e)=>updateForm({password: e.target.value})}
               /> 
               <br/>
              
               
                <button className='blog__btn' type='submit'>
                Sign in
                </button>
        </form>
        </div>
        </div>
    </div>
    )
}