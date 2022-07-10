import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer';
import { TextField } from '@mui/material';

const Guitar =() =>{
    const [guitarData, setGuitarData] = useState([]);

    useEffect(() =>{
        axios.get(`http://localhost:1337/api/guitars?sort=producer.name&sort=name&populate=producer`)
        .then((reponse) =>{
            setGuitarData({initial: reponse.data.data, curent: reponse.data.data});
        })
        .catch(err =>{
            console.log(err)
        })
    },[]);

const onSearch = (input) => {
    setGuitarData({
      ...guitarData,
      curent: guitarData.initial.filter((element) => {
        if (input.target.value === "") {
          return element;
        } else {
          let nameCheck = false;    
          let yearCheck = false;
          let producerCheck = false;
          if (element.attributes.name) {
            nameCheck = element.attributes.name
              .toLowerCase()
              .includes(input.target.value.toLowerCase());
          }
          if (element.attributes.year) {
            yearCheck = element.attributes.year
                .toString()
                .includes(input.target.value.toLowerCase());
          }
          if (element.attributes.producer.data) {
                producerCheck = element.attributes.producer.data.attributes.name
                .toLowerCase()
                .includes(input.target.value.toLowerCase());
            }
          return nameCheck || yearCheck || producerCheck;
        }
      }),
    });
  };

    return ( 
    <div className='App'>

        <Navbar></Navbar>
        <h1 className='title'>Toutes les guitares</h1>
        
            <div className='searchAdd'>
                <TextField
                name="filter"
                fullWidth
                label="Rechercher une guitare"
                onChange={onSearch}
                variant="filled"
                sx={{
                    marginBottom: "1rem",
                    width: "40%",
                    backgroundColor: '#faf0e6',
                    textAlign: 'center',
                }}
            />
            {localStorage.getItem('token') && <Link to={`/guitares/new`} className="bouttonAjouter">Ajouter une guitare</Link>}
        </div>
        <div className='blocGuitar'>
        <ul>
            {
                guitarData.curent && guitarData.curent.map((guitar) =>(<Link to={`/guitares/${guitar.id}`} className="lienGuitare" key={guitar.id}>{!guitar.attributes.deleted && <li className='listShowArtist guitare'  >{guitar.attributes.producer.data? guitar.attributes.producer.data.attributes.name : ""} {guitar.attributes.name} {guitar.attributes.year}</li>}</Link>))
            }
        </ul> 
        </div>
        <Footer></Footer>
    </div>
    );
};

export default Guitar;