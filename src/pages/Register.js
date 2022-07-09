import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const Register =() =>{

    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
    console.log(data);
    const register =  () =>{
        
        console.log(data.username);
        axios.post('http://localhost:1337/api/auth/local/register', {
            "username": data.username,
            "password": data.password,
            "email": data.email,
            "name": data.name,
            "first_name": data.first_name,
    }).then((reponse) =>{
            console.log(reponse);  
            alert('Vous êtes inscrit!!!');
            window.location.href = "/login";
    }).catch((err) =>{
            /* console.log(err.response);
            console.log(err.response.data.error); */
            alert(err.response.data.error.message);   
        })
    }


    return ( <div className='App'>
    <Navbar></Navbar>
    <h1 className='title'>Inscription</h1>
    {localStorage.getItem('token')?
    <div>
        <Navigate to="/" />
    </div>
    :
    <div>
        <form  className="auth">
            <input type="text" id="identifiant" name="identifiant" placeholder='Identifiant' required onChange={(e)=> setData({...data, username: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase()})}/>
                <input type="text" name='nom' id='nom' placeholder='Nom' onChange={(e)=> setData({...data, name: e.target.value})}/>
                <input type="text" name='prenom' id='prenom' placeholder='Prénom' onChange={(e)=> setData({...data, first_name: e.target.value})}/>
                <input type="email" name='email' id='email' placeholder='Email' onChange={(e)=> setData({...data, email: e.target.value})} required/>
                <input type="password" name='password' id='password' placeholder='Mot de passe (min. 6 char)' minLength="6" required onChange={(e)=> setData({...data, password: e.target.value})}/>
                
            {/* <label htmlFor="passwordConfirm">Confirmation du mot de passe :</label>
            <input type="password" name='passwordConfirm' id='passwordConfirm' /> */}
           <div>
            <button type="button" className='classBoutton' onClick={register}>S'inscrire</button></div>
        </form>
    </div>
    }
    
    <Footer></Footer>
</div>
);
};

export default Register;