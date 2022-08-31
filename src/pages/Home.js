import React from 'react';
import '../App.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


const Home = () => {

    return (
        <div className="App">
            <Navbar />
            <h1 className='title'>La mine du guitariste</h1>
            <div className='home'>
                <h2>Bienvenue sur la mine du guitarise!</h2>
                <br />
                <p> 
                Vous trouverez sur ce site des informations concernant les guitaristes célèbres ainsi que sur leur matériel.
                </p>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;