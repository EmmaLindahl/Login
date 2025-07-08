import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate()
    const [loggedinUser, setLoggedinUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/login');
            return;
        }
        const base64Payload = token.split('.')[1];
        setLoggedinUser(JSON.parse(atob(base64Payload)));
    }, [])


    return <>
        <h1> HomePage </h1>
        {loggedinUser && <div>You're logged in as: {loggedinUser.username}</div>}
    </>
};

export default Homepage;
