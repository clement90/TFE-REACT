import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';



const Login =() =>{
    const [data, setData] = useState([]);
    const [loginData, setLoginData] = useState([]);

    const connexion = (data) =>{
        axios.post('http://localhost:1337/api/auth/local?populate=%2A', {
            identifier: data.identifier,
            password: data.password
    }).then((reponse) =>{
        setLoginData(reponse.data);
        localStorage.setItem('token', reponse.data.jwt);
        localStorage.setItem('admin', reponse.data.user.admin)
        localStorage.setItem('id', reponse.data.user.id)
        window.location.href = "/";
    }).catch(err =>{
        alert(err.response.data.error.message);
    })
    }

    return ( 
    <div className='App'>
        <Navbar></Navbar>
        
        <h1 className='title'>Connexion</h1>
        {localStorage.getItem('token')?
        <div>
            <Navigate to="/" />
        </div>
        :
        <div>
            <form action="" method='post' className='auth'>
                <input type="text" placeholder='Identifiant' onChange={(e) => setData({...data, identifier: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase()})} />
                <input type="password" placeholder='Mot de passe' onChange={(e) => setData({...data, password: e.target.value})} />
                <div className='login'><button type='button' className='classBoutton' onClick={()=>connexion(data)}>Connexion</button></div>
            </form>
        </div>
        }
        
        <Footer></Footer>
    </div>
    );
};

export default Login;