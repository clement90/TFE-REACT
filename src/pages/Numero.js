import { TextField } from '@mui/material';
import { useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const Numero =() =>{

    const [numero, setNumero] = useState([]);

    const onSearch = (input) =>{
        /* console.log(input.target.value); */
        setNumero("");
        if (!isNaN(input.target.value)){
            if(input.target.value.length == 8 || input.target.value.length == 9){
                let year = input.target.value.charAt(0) + input.target.value.charAt(4);
                if(input.target.value.length == 8){
                    if(input.target.value.substring(0,2) == "99")
                        {
                            year = 75
                        }
                    if(input.target.value.substring(0,2) == "06")
                    {
                        year = 77
                    }

                }
                
                if(year > 74)
                {
                    year = '19' + year;
                }else{
                    if(year < 23){
                        year = '20' + year;
                    }
                    else{
                        year = 'invalide';
                    }
                }
                setNumero(year);
            }else{
                setNumero('Numéro invalide');
            }
        }
        if(input.target.value.substring(0,2) == "20"){
            setNumero("2000");
        }


    }

    return ( 
    <div className='App'>
        <Navbar></Navbar>
        <h1 className='title'>Numéro de série</h1>
        <div className='home'>
            <p>
                Dans cette section vous allez pouvoir dater votre guitare en fonction du numéro de série. 
                <br />Dans un premier temps, la recherche ne fonctionne que pour les <span className='bold'> Gibson de 1975 à aujourd'hui</span>.
                <br />Au fil du temps de nouvelles marques se rajouterons
            </p>
        </div>
        <div className='searchAdd'>
              <TextField
                name="filter"
                fullWidth
                label="Rechercher un numéro de série"
                onChange={onSearch}
                variant="filled"
                sx={{
                    marginBottom: "1rem",
                    width: "40%",
                    backgroundColor: '#faf0e6',
                    textAlign: 'center',
                }}
              />
        </div>
        <div>
            <p>
            {
                numero && 'Année de production : ' + numero 
            }</p> 
        </div>
        
        
        <Footer></Footer>
    </div>
    );
};

export default Numero