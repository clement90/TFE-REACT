import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from "../../Components/Navbar";
import Footer from '../../Components/Footer';
import GuitarArtist from '../../Components/GuitarArtist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import AdminArtistGuitarUpdate from '../admin/artist/AdminArtistGuitarUpdate';
import AdminArtistBandUpdate from '../admin/artist/AdminArtistBandUpdate';


const ShowArtists = () => {
  const { artistId } = useParams();
  const [artistData, setArtistData] = useState([]);
  const [update, setUpdate] = useState(false);

  const [guitar, setGuitar] = useState([]);
  const [band, setBand] = useState([]);
  Modal.setAppElement('#root');

/* Modale guitare */

  const [modalIsOpenGuitar, setIsOpenGuitar] = useState(false);

  function openModalGuitar() {
      setIsOpenGuitar(true);
      setGuitar(artistData);
  }

  function closeModalGuitar() {
      setIsOpenGuitar(false);
  }

  /* Modale band */

  const [modalIsOpenBand, setIsOpenBand] = useState(false);

  function openModalBand() {
      setIsOpenBand(true);
      setBand(artistData);
  }

  function closeModalBand() {
      setIsOpenBand(false);
  }
   
//Permet de récupérer 2 populates

  const qs = require('qs');
  const query = qs.stringify({
    populate: {
      band_id: {
          fields: ['name'],
          populate : ['albums']
      },
      guitar_id: {
        populate: ['producer'],
      } 
    } 
  }, {
    encodeValuesOnly: true,
  });

//Utilisation de query dans la requête pour récupérer les 2 populates

 /* request(`http://localhost:1337/api/artists?${query}`); */
       
    useEffect(() =>{
        axios.get(`http://localhost:1337/api/artists/${artistId}?${query}`)
        .then((reponse) =>{
            setArtistData(reponse.data.data);
        })
        .catch(err =>{
            console.log(err)
        })
    },[]);

  const updateArtist = () => {
      if(update === false){
          setUpdate(true);}
      else{
          setUpdate(false);
      }
  }
  
  const deleteArtist = () => {
    if(window.confirm("Voulez-vous supprimer cet artiste ?")){
      axios.put(`http://localhost:1337/api/artists/${artistId}`,{
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
          },
          data: {
              deleted: true
          }
      }
      )
      .then(() =>{
          window.location.href = "/artists";
      })
      .catch(err =>{
          console.log(err)
      })
  }
  }
  const saveData = (data) => {
        
    axios.put(`http://localhost:1337/api/artists/${artistId}`, {
        data: {
            name: data.name,
            first_name: data.first_name,
            description: data.description,
            birthday: data.birthday,
        }
    }, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }).then((response) =>{
            console.log(response);
        }).catch(err =>{
            console.log(err)
        })
  }

    return ( 
    <div className='App'>
      <Modal
                        isOpen={modalIsOpenGuitar}
                        onRequestClose={closeModalGuitar}
                        className="modal"
                        contentLabel="Modal"
                        overlayClassName="overlay"
                    >
                        <AdminArtistGuitarUpdate data= {guitar}/>
                    </Modal>
                <Modal
                    isOpen={modalIsOpenBand}
                    onRequestClose={closeModalBand}
                    className="modal"
                    contentLabel="Modal"
                    overlayClassName="overlay"
                >
                    <AdminArtistBandUpdate data= {band}/>
                </Modal>
      <Navbar></Navbar>
      {!update?
      <div>
        <h1 className='title'>{artistData.attributes && artistData.attributes.first_name} {artistData.attributes && artistData.attributes.name}</h1>
        <h2 className='title'>{artistData.attributes && artistData.attributes.band_id && artistData.attributes.band_id.data!=0? artistData.attributes.band_id.data.map((groupe) =>(<li className='listShowArtist' key={groupe.id} ><Link to={`/groupes/${groupe.id}`} >{groupe.attributes.name}</Link></li>)) : "Pas de groupe associé"}</h2>
        <div className='description'>
          <p>{artistData.attributes && artistData.attributes.description? artistData.attributes.description : "Il n'y a pas encore de description"}</p>
        </div>
        <br />
        <GuitarArtist guitare={artistData.attributes && artistData.attributes.guitar_id}></GuitarArtist>
      </div>
      :
      <div>
        <form action="" className='updateGuitare'>
          <div>
            <label htmlFor="firstName">Prénom : </label>
            <input type="text" name="firstName" id="firstName" defaultValue={artistData.attributes.first_name} onChange={(e) => setArtistData({...artistData, first_name: e.target.value})} />
          </div>
          <div>
            <label htmlFor="name">Nom : </label>
            <input type="text" name="name" id="name" defaultValue={artistData.attributes.name} onChange={(e) => setArtistData({...artistData, name: e.target.value})} />
          </div>
          <div>
                    <label htmlFor="birthday">Date de naissance : </label>
                    <input type="date" name="birthday" id="birthday" defaultValue={artistData.attributes.birthday} onChange={(e) => setArtistData({...artistData, birthday: e.target.value})}/>
                </div>
          <div>
            <label htmlFor="description">Description : </label>
            <textarea name="description" id="description" defaultValue={artistData.attributes.description} cols="30" rows="10" onChange={(e) => setArtistData({...artistData, description: e.target.value})} />
          </div>
          <div>
            <label htmlFor="band">Groupe(s) : </label>
            <FontAwesomeIcon icon={faPeopleGroup} className="edit" onClick={openModalBand} />
          </div>
          <div>
            <label htmlFor="guitar">Guitare(s) : </label>
            <FontAwesomeIcon icon={faGuitar} className="edit" onClick={openModalGuitar} />
          </div>          
        </form>
      </div>}
      <br />
      <br />
      {localStorage.getItem('token') && !update && 
            <div className="sousMenu">
                <a className='classBoutton' onClick={updateArtist}>Mettre à jour</a>
                <a className='classBoutton' onClick={deleteArtist} type="submit" >Supprimer</a>
            </div>}
      {localStorage.getItem('token') && update &&   
            <div className="sousMenu">
            <a className="classBoutton" onClick={updateArtist}>Annuler</a>
            <a href={`/artists/${artistId}`} className="classBoutton" onClick={() => saveData(artistData)}>Sauvegarder</a>
            </div>}
            <br />
             <Link to={'/artists'} className='classBoutton'>Tout les groupes</Link>
      <Footer></Footer>
    </div>
);
    }
export default ShowArtists;