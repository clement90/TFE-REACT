import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer';
import { TextField } from '@mui/material';

const Guitar =() =>{
    const [guitarData, setGuitarData] = useState([]);
    /* const [producer, setProducer] = useState([]); */
    

    useEffect(() =>{
        axios.get(`http://localhost:1337/api/guitars?sort=producer.name&sort=name&populate=producer`)
        .then((reponse) =>{
            setGuitarData({initial: reponse.data.data, curent: reponse.data.data});
            
            
        })
        .catch(err =>{
            console.log(err)
        })
    },[]);

    /* useEffect(() =>{
        axios.get(`http://localhost:1337/api/producers?sort=name&populate=%2A`)
        .then((reponse) =>{
            setProducer(reponse.data.data);
            
            
        })
        .catch(err =>{
            console.log(err)
        })
    },[]); */

/* console.log(guitarData); */
/* console.log(producer); */

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
        {/* <input type="text" placeholder="Search" /> */}
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
                    /* borderRadius: '20px', */
                    textAlign: 'center',
                }}
            />
            {localStorage.getItem('token') && <Link to={`/guitares/new`} className="bouttonAjouter">Ajouter une guitare</Link>}
        </div>
        <div className='blocGuitar'>
        <ul>
            {
                guitarData.curent && guitarData.curent.map((guitar) =>(<Link to={`/guitares/${guitar.id}`} className="lienGuitare" key={guitar.id}>{!guitar.attributes.deleted && <li className='listShowArtist guitare'  >{guitar.attributes.producer.data? guitar.attributes.producer.data.attributes.name : ""} {guitar.attributes.name} {guitar.attributes.year}</li>}</Link>))
                /* guitarData.map((guitar) =>(<li className='listShowArtist' key={guitar.id} >{guitar.attributes.producer.data.attributes.name}</li>)) */
            }
        </ul> 
        </div>   
       {/*  <ul>
            {
                producer.map((producer) =>(<li className='listShowArtist' key={producer.attributes.guitars.data.map((guitar) =>(console.log(guitar.id)))} >{producer.attributes.name}{producer.attributes.guitars.data.map((guitar) =>(guitar.attributes.name))}</li>))
                producer.map((producer) =>
                    (<li className='listShowArtist' key={producer.id} >

                        {producer.attributes.guitars.data.map((guitar) =>(<li className='listShowArtist' key={guitar.id} > {producer.attributes.name}{guitar.attributes.name}</li>))}
                        
                        </li>))
            }

        </ul> */}

        <Footer></Footer>
    </div>
    );
};

export default Guitar;