import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer';
import { TextField } from '@mui/material';

const Band =() =>{
    const [bandData, setBandData] = useState([]);
    useEffect(() =>{
        axios.get(`http://localhost:1337/api/bands?sort=name&populate=albums`)
        .then((reponse) =>{
            setBandData({initial: reponse.data.data, curent: reponse.data.data});
        }).catch(err =>{
            console.log(err)
        })
    },[]);


    const onSearch = (input) => {
        setBandData({
          ...bandData,
          curent: bandData.initial.filter((element) => {
            if (input.target.value === "") {
              return element;
            } else {
              let nameCheck = false;
              if (element.attributes.name) {
                nameCheck = element.attributes.name
                  .toLowerCase()
                  .includes(input.target.value.toLowerCase());
              }
              return nameCheck;
            }
          }),
        });
      }

    return(
        <div className='App'>
            <Navbar />
            <h1 className='title'>Groupes</h1>
            <div className='searchAdd'>
                <TextField
                name="filter"
                fullWidth
                label="Rechercher un groupe"
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
                {localStorage.getItem('token') && <Link to={`/groupes/new`} className="bouttonAjouter">Ajouter un groupe</Link>}
            </div>
            <div className='blocGuitar'>
                <ul>
                    {
                        bandData.curent && bandData.curent.map((band) =>(<Link to={`/groupes/${band.id}`} className="lienGuitare" key={band.id}>{band.attributes.deleted!=true &&<li className='listShowArtist guitare'  >{band.attributes.name}</li> }
                        </Link>))
                    }
                </ul> 
            </div>
            <Footer></Footer>
        </div>)

}

export default Band;