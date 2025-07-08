import { useState } from "react";
import '../App.css'
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) =>{
        e.preventDefault();

        try{
            console.log(username, password)
            const res = await fetch('http://localhost:5000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            });
            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Login failed");
                return;
            }

            localStorage.setItem('token', data.token);
            setMessage(data.message);
            navigate('/')

        } catch (err){
            setMessage("Login failed: " + err.message)
            console.log(err)
        }
    };
    
    return <>
        <h1>Login</h1>
    <div className="loginpage">
    
        <form className="form" onSubmit={handleLogin}>
        <input
            className="forminput"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <input 
            className="forminput"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <div>{message}</div>
        <button type="submit" className="button-87 ">Log In</button>

        </form>
    </div>
        
       
    </>
};

export default LoginForm;
