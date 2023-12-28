const Login = () => {
    return (
        <div className="wrapper">
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="Username"
                        required
                        ></input>
                    <i class='bx bxs-envelope'></i>
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="password"
                        required
                        ></input>
                    <i class='bx bxs-lock-alt' ></i>
                </div>

                <div className="remember-forgot">
                    <label>< input type="checkbox"></input> Remmember me </label>
                    <a href="#">Forgot password?</a>

                </div>
                <button className="btn" type="submit">Login</button>
            </form>
         
            {/* Other login-related content */}
        </div>
        );
    }


    export default Login;
    
