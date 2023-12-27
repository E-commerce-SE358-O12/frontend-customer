import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './../assets/css/rectangle.css';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axiosss from '../api/axios.jsx';

const LOGIN_URL='/auth';


const InputFrame = ({ children }) => {
    return <div className="input-frame">{children}</div>;
  };
 


const Login = () => {
  const {setAuth} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [sucess,setSuccess] = useState(false);
const [errmsg, setErrMsg] = useState(''); 
const [errRef,setErrRef] = useRef();
const [userRef, setUserRef] = useRef();
  const handleEmail=(e)=>{
    console.log(e.target.value)
    setEmail(e.target.value)
  }

  const handelPassword=(e)=>{
    console.log(e.target.value)
    setPassword(e.target.value)
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();

    try
    {
        const response=await axiosss.post
        (
          LOGIN_URL,
          JSON.stringify({email,password }),
          {
            headers: {'Content-Type:':'application/json'},
            withCredentials:true 
          }
        );
        console.log(JSON.stringify(response?.data));
        const accessToken=response?.data?.accessToken;
        const roles=response?.data?.roles;
        setAuth({email,password,roles,accessToken});
        setEmail('');
        setPassword('');
        setSuccess(true);
    }
    catch(err)
    {
        if(!err?.response)

        {
          setErrMsg('No server respone');
        }

        else if(err.response?.status===400)
        {
          setErrMsg('Missing email, password')
        }
        else if(err.response?.status===401)
        {
          setErrMsg('Unanthorized');
        }
        else
        {
          setErrMsg('MLogin failed')
        }
        errRef.current.focus();
    }

    console.log('submit form');
    axios.post('http://localhost:3200/login', {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response.data)
      alert('sucess login')
    })
    .catch((err)=>{
      console.log(err)
      console.log(err.response)
      alert(err.response.data.console.message)
    })
  }

  const handleLogin = () => {
    // Implement login logic
    console.log('Logging in...');
  };

 

  return (
    <div className='wrappper'>
     <form action='' onSubmit={handleSubmit}>
      <h1>E-commerce</h1>
      
      <div className='input-box'>
    
        <input 
            type='text' 
            placeholder='ellie@gmail.com' 
            required 
            onChange={handleEmail}
            value={email}></input>
        <i class='bx bx-envelope'></i>

      </div>

      <div className='input-box'>
       
        <input 
            type='password' 
            placeholder='****' 
            required 
            onChange={handelPassword}
            value={password}
            ></input>
        <i class='bx bxs-lock-alt' ></i>
      </div>

      <div className='remember-forgot'>
        <label>
          <input type="checkbox"></input>
          Remember me
          </label>
          <a href='#'> Forgot Password</a>
      </div>

      <button type='submit' className='btn'>Login</button>
     </form>
    </div>
  );
};
