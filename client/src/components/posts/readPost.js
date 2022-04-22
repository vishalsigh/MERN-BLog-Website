import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../posts/read.css';
import logo from '../../QWESWERY-logos.png';

function ReadPost() {
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

    return(
       <div className="read__container">
           <div className='read__section'>
               <h2 className="read__title">{form.title}</h2>
               <div className="content">
                    <p className="read__p">{form.content}</p>
               </div>
               <div className="img">
                   <img src={logo} alt='logo' />
               </div>
            </div>
       </div> 
    );
}
export default ReadPost;