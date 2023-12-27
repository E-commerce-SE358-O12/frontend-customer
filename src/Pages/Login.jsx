import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './../assets/css/rectangle.css';

const InputFrame = ({ children }) => {
    return <div className="input-frame">{children}</div>;
  };
 


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic
    console.log('Logging in...');
  };

  const maskedPassword = '*'.repeat(password.length); 

  return (
    <div className="rectangle">
        <div className="login-wrapper">
            <div className="login-form">
                
            </div>

        <form onSubmit={handleLogin}>
            <label_Ecomerce> E-commerce</label_Ecomerce>
            <InputFrame>
          <label_input>Email:</label_input>
          <input
            type="email"
            placeholder="ellie@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputFrame>

        <InputFrame>
          <label>Password:</label>
          <input
           type="text"  // Use type="text" to display the masked password
           value={maskedPassword}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputFrame>

        <button type="submit">
            <text  >go to store </text>
            <span>&rarr;</span>
            </button>    

        </form>
       </div>
    </div>
  );
};
