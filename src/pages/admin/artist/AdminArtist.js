import React, { useState } from "react";
import Footer from "../../../Components/Footer";
import Navbar from "../../../Components/Navbar";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import AdminArtistUpdate from "./AdminArtistUpdate";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGuitar, faPenToSquare, faPeopleGroup, faXmark } from "@fortawesome/free-solid-svg-icons";
import AdminArtistGuitarUpdate from "./AdminArtistGuitarUpdate";
import AdminArtistBandUpdate from "./AdminArtistBandUpdate";
import { TextField } from "@mui/material";

const AdminArtist = () => {

    const [artist, setArtist] = useState([]);
    const [artistSelected, setArtistSelected] = useState();
    const [guitar, setGuitar] = useState([]);
    const [band, setBand] = useState([]);
   

    Modal.setAppElement('#root');
    /* Modale edition */
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(artist) {
    setIsOpen(true);
    setArtistSelected(artist);
  }

  
  function closeModal() {
    setIsOpen(false);
  }

  /* Modale guitare */

    const [modalIsOpenGuitar, setIsOpenGuitar] = useState(false);

    function openModalGuitar(artist) {
        setIsOpenGuitar(true);
        setGuitar(artist);
    }

    function closeModalGuitar() {
        setIsOpenGuitar(false);
    }

    /* Modale band */

    const [modalIsOpenBand, setIsOpenBand] = useState(false);

    function openModalBand(artist) {
        setIsOpenBand(true);
        setBand(artist);
    }

    function closeModalBand() {
        setIsOpenBand(false);
    }

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


  useEffect(() =>{
    axios.get(`http://localhost:1337/api/artists?sort=name&populate=band_id%2C%20guitar_id&${query}`)
    .then((reponse) =>{
        setArtist({initial: reponse.data.data, curent: reponse.data.data});
    }).catch(err =>{
        console.log(err)
    })
},[]);

const deleteArtist = (id) => {
    if(window.confirm("Voulez-vous supprimer ce guitariste ?")){
        axios.delete(`http://localhost:1337/api/artists/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(() => {
            window.location.href = "/admin/artistes";
        }).catch(err => {
            console.log(err);
        }); 
    }
}

const onSearch = (input) => {
    setArtist({
      ...artist,
      curent: artist.initial.filter((element) => {
        if (input.target.value === "") {
          return element;
        } else {
          let nameCheck = false;
          let first_nameCheck = false;
          let bandCheck = false;
          let idCheck = false;
          if (element.attributes.name) {
            nameCheck = element.attributes.name
              .toLowerCase()
              .includes(input.target.value.toLowerCase());
          }
          if (element.attributes.first_name) {
            first_nameCheck = element.attributes.first_name
              .toLowerCase()
              .includes(input.target.value.toLowerCase());
          }
          if (element.attributes.band_id.data.length!=0) {
                element.attributes.band_id.data.map((band) => {
                    if (band.attributes.name.toLowerCase().includes(input.target.value.toLowerCase())) {
                        bandCheck = band.attributes.name;
                    }
                }
                );
            }
            if (element.id){
                idCheck = element.id.toString().includes(input.target.value.toLowerCase());
            }
          return nameCheck || first_nameCheck || bandCheck || idCheck;
        }
      }),
    });
  };

  
  return (
        <div className="App">
            <Navbar></Navbar>       
            <h1 className="title">Administration des guitaristes</h1>
            {localStorage.getItem("admin") ==="true" ?
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="modal"
                    contentLabel="Modal"
                    overlayClassName="overlay"
                >
                    <AdminArtistUpdate artist= {artistSelected}/>
                </Modal>
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
                <TextField
                    name="filter"
                    fullWidth
                    label="Rechercher un artiste"
                    onChange={onSearch}
                    variant="filled"
                    sx={{
                        width: "40%",
                        backgroundColor: '#faf0e6',
                        textAlign: 'center',
                    }}
                />
                <table className="adminTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Deleted</th>
                            <th>Guitare</th>
                            <th>Groupe</th>
                            <th>Editer</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            artist.curent && artist.curent.map((artist) =>(
                                <tr key={artist.id} className="">
                                    <td>{artist.id}</td>
                                    <td>{artist.attributes.name}</td>
                                    <td>{artist.attributes.first_name}</td>
                                    <td>{artist.attributes.deleted? "oui" : "non"}</td>
                                    <td><FontAwesomeIcon icon={faGuitar} className="edit" onClick={()=>openModalGuitar(artist)}/></td>
                                    <td><FontAwesomeIcon icon={faPeopleGroup} className="edit" onClick={()=>openModalBand(artist)} /></td>
                                    <td><FontAwesomeIcon icon={faPenToSquare} className="edit" id="myBtn" onClick={()=>openModal(artist)} /></td>
                                    <td><FontAwesomeIcon icon={faXmark} className="delete" onClick={()=>deleteArtist(artist.id)}/></td>
                                </tr>))}
                    </tbody>
                </table>
            </div> : window.location.href = "/"}
            <Footer></Footer>
        </div>
    );
}

export default AdminArtist;





