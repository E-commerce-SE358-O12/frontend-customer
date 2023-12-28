import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axioss';
import { setAccessToken } from '../context/authService';
const LOGIN_URL='/auth';



const Login = () => {
    const  setAuth =useContext(AuthContext);
    const userRef=useRef();
    const errRef=useRef();
    const [email,setEmail]=useState('');
    const [pwd,setPwd]=useState('');
    const [errmsg, setErrMsg] = useState(''); 
    const [sucess,setSuccess] = useState(false);

 
    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        setErrMsg('');
    },[email,pwd]);

    const handleSubmit = async (e) =>{
        e.preventDefault();

        console.log(email,pwd);
        setEmail('');
        setPwd('');
        setSuccess(true);  
        
        try
        {
            const response=await axios.post
            (
              LOGIN_URL,
              JSON.stringify({email,pwd }),
              {
                headers: {'Content-Type:':'application/json'},
                withCredentials:true 
              }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken=response?.data?.accessToken;
            const roles=response?.data?.roles;

            setAuth({email,pwd,roles,accessToken});
            setEmail('');
            setPwd('');
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
              setErrMsg('Login failed')
            }
            errRef.current.focus();
        }

    }



    const handleLogin = async () => 
    {
        try {
          // Make an API call to authenticate
          const response = await fetch('YOUR_AUTH_API_ENDPOINT', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, pwd }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            // Store the access token on successful login
            setAccessToken(data.access_token);
            // Redirect to a protected route
            // history.push('/dashboard');
          } else {
            // Handle authentication error
            console.error('Authentication failed');
          }
        } catch (error) {
          console.error('Error during authentication', error);
        }
    };

    return (
        
      <div className="wrapper">
            <p ref={errRef}
                className={errmsg?"errmsg":"offscreen" }aria-live="assertive">{errmsg}</p>
            <form 
                action=""
                onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input 
                        type="text" 
                        id='id_email'
                        autoComplete='off'
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        ref={userRef}
                        placeholder="Username"
                        required
                        ></input>
                    <i class='bx bxs-envelope'></i>
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="password"
                        onChange={(e)=>setPwd(e.target.value)}
                        value={pwd}
                        required
                        ></input>
                    <i class='bx bxs-lock-alt' ></i>
                </div>

                <div className="remember-forgot">
                    <label>< input type="checkbox"></input> Remmember me </label>
                    <a href="#">Forgot password?</a>

                </div>
                <button className="btn" type="submit" onClick={handleLogin}>Login</button>
            </form>
         
            {/* Other login-related content */}
        </div>
      
    );
}

