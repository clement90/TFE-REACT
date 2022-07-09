import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


const Home = () => {

    return (
        <div className="App">
            <Navbar />
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <h1 className="text-3xl font-bold underline">
                    Hello
                </h1>

            </header> */}
            <h1 className='title'>La mine du guitariste</h1>
            <div className='home'>
                <h2>Bienvenu sur la mine du guitarise!</h2>
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