import { TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';

const Album =() =>{

    const [albumData, setAlbumData] = useState([]);


    useEffect(() =>{
        axios.get(`http://localhost:1337/api/albums?sort=band.name&populate=band`)
        .then((reponse) =>{
            setAlbumData({initial: reponse.data.data, curent: reponse.data.data});
        }).catch(err =>{
            console.log(err)
        })
    },[]);

    const onSearch = (input) => {
        setAlbumData({
          ...albumData,
          curent: albumData.initial.filter((element) => {
            if (input.target.value === "") {
              return element;
            } else {
              let titleCheck = false;
              let bandCheck = false;
              if (element.attributes.title) {
                titleCheck = element.attributes.title
                  .toLowerCase()
                  .includes(input.target.value.toLowerCase());
              }
              if (element.attributes.band.data) {
                    bandCheck = element.attributes.band.data.attributes.name
                    .toLowerCase()
                    .includes(input.target.value.toLowerCase());
                }
              return titleCheck || bandCheck;
            }
          }),
        });
      };

    return ( 
    <div className='App'>
        <Navbar></Navbar>
        <h1 className='title'>Tous les albums</h1>
        <div className='searchAdd'>
              <TextField
                name="filter"
                fullWidth
                label="Rechercher un album"
                onChange={onSearch}
                variant="filled"
                sx={{
                    marginBottom: "1rem",
                    width: "40%",
                    backgroundColor: '#faf0e6',
                    textAlign: 'center',
                }}
              />
            {localStorage.getItem("token") && <Link to={`/albums/new`} className="bouttonAjouter">Ajouter un album</Link>}
        </div>
        <div className='blocGuitar'>
            <ul>
                {
                    albumData.curent && albumData.curent.map((album) =>(<Link to={`/albums/${album.id}`} className="lienGuitare" key={album.id}>{album.attributes.deleted!=true?<li className='listShowArtist guitare'  >{album.attributes.band.data? album.attributes.band.data.attributes.name : ""} {album.attributes.title}</li>:"" }
                    </Link>))
                }
            </ul> 
        </div>
        <Footer></Footer>   
    </div>
    )
}
    
export default Album