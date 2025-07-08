import { useState } from "react";

const RegisterForm = () =>{
    const [newUser, setNewUser] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [registerMessage, setRegisterMessage] = useState("")

    const handelRegister = async (e) => {
        e.preventDefault();

        try{
            console.log(newUser, newPassword)
            const res = await fetch('http://localhost:5000/register', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({username:newUser, password:newPassword})
            });
            const text = res.text()
            setRegisterMessage(text)
            

        }catch(err){
            setRegisterMessage("Registration failed: " + err.message)
        }
    }

    return <>
        <div>RegisterForm</div>
        <div className="loginpage">
            <form className="form" onSubmit={handelRegister}>
                <input
                    className="forminput"
                    type="text"
                    placeholder="new username"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                    required
                />
                <input
                    className="forminput"
                    type="text"
                    placeholder="new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <div>{registerMessage}</div>
                <button type="submit" className="button-87">Create</button>
            </form>
        </div>
    </>
};

export default RegisterForm;