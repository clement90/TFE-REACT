import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import Card from '../../Components/CardArtist';
import Footer from '../../Components/Footer';
import TextField from "@mui/material/TextField";
import { Link } from 'react-router-dom';

//Utilisation du composant Card

const Artists = () => {
    const [artistsData, setArtistsData] = useState([]);
    
    //Récuperation de tout les artistes
    useEffect(() =>{
        axios.get(`http://localhost:1337/api/artists?sort=first_name&populate=band_id`
        ).then((reponse) =>{
            setArtistsData({initial: reponse.data.data, curent: reponse.data.data});
        })
        .catch(err =>{
            console.log(err)
        })
    },[]);
    
    //Recherche d'un artiste

    const onSearch = (input) => {
        setArtistsData({
          ...artistsData,
          curent: artistsData.initial.filter((element) => {
            if (input.target.value === "") {
              return element;
            } else {
              let nameCheck = false;
              let first_nameCheck = false;
              let bandCheck = false;
              if (element.attributes.name) {
                nameCheck = element.attributes.name
                  .toLowerCase()
                  .includes(input.target.value.toLowerCase().split(" ").join(""));
              }
              if (element.attributes.first_name) {
                first_nameCheck = element.attributes.first_name
                  .toLowerCase()
                  .includes(input.target.value.toLowerCase().split(" ").join(""));
              }
              if (element.attributes.band_id.data.length!=0) {
                    element.attributes.band_id.data.map((band) => {
                        if (band.attributes.name.toLowerCase().includes(input.target.value.toLowerCase().split(" ").join(""))) {
                            bandCheck = band.attributes.name;
                        }
                    }
                    );
                }
              return nameCheck || first_nameCheck || bandCheck;
            }
          }),
        });
      };
   
    return ( 
    <div className='App'>
        <Navbar className="selected"></Navbar>
        <h1 className='title'>Artistes</h1>
        <div className='searchAdd'>
          <TextField
              name="filter"
              fullWidth
              label="Rechercher un artiste"
              onChange={onSearch}
              variant="filled"
              sx={{
                  marginBottom: "1rem",
                  width: "40%",
                  backgroundColor: '#faf0e6',
                  textAlign: 'center',
                }}
            />
            {localStorage.getItem('token') && <Link to={`/artists/new`} className="bouttonAjouter">Ajouter un artiste</Link>}
        </div>
        <br />
        <ul>
            {
                artistsData.curent && artistsData.curent.map((artist) => {
                    return !artist.attributes.deleted && <Card key={artist.id} artist={artist} />
                }
                )
            }
        </ul>
          
            <Footer></Footer>
    </div>
    );
};

export default Artists;



  