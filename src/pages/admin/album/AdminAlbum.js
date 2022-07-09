import React, { useState } from "react";
import Footer from "../../../Components/Footer";
import Navbar from "../../../Components/Navbar";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import AdminAlbumUpdate from "./AdminAlbumUpdate";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";

const AdminAlbum = () => {

    const [album, setAlbum] = useState([]);
    const [albumSelected, setAlbumSelected] = useState();
    const date = new Date();

    Modal.setAppElement('#root');
    /* let subtitle; */
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(album) {
        setIsOpen(true);
        setAlbumSelected(album);
    }

    
    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() =>{
        axios.get(`http://localhost:1337/api/albums?sort=band.name&populate=band&sort=year`)
        .then((reponse) =>{
            setAlbum({initial: reponse.data.data, curent: reponse.data.data});
        }).catch(err =>{
            console.log(err)
        })
    },[]);

    const deleteAlbum = (id) => {
        if(window.confirm("Voulez-vous supprimer cet album ?")){
            axios.delete(`http://localhost:1337/api/albums/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {
                window.location.href = "/admin/albums";
            }).catch(err => {
                console.log(err);
            });
        }
    }

    const onSearch = (input) => {
        setAlbum({
        ...album,
        curent: album.initial.filter((element) => {
            if (input.target.value === "") {
            return element;
            } else {
            let titleCheck = false;
            let bandCheck = false;
            let yearCheck = false;
            let idCheck = false;
            if (element.attributes.title) {
                titleCheck = element.attributes.title
                .toLowerCase()
                .includes(input.target.value.toLowerCase());
            }
            if (element.attributes.year) {
                yearCheck = element.attributes.year
                    .toString()
                    .includes(input.target.value.toLowerCase());
            }
            if (element.attributes.band.data) {
                    bandCheck = element.attributes.band.data.attributes.name
                    .toLowerCase()
                    .includes(input.target.value.toLowerCase());
                }
            if (element.id){
                idCheck = element.id.toString().includes(input.target.value.toLowerCase());
            }
            return titleCheck || yearCheck || bandCheck || idCheck;
            }
        }),
        });
    };
        

  return (
        <div className="App">
            <Navbar></Navbar>
            <Modal
                    isOpen={modalIsOpen}
                    /* onAfterOpen={afterOpenModal} */
                    onRequestClose={closeModal}
                    className="modal"
                    contentLabel="Modal"
                    overlayClassName="overlay"
                >
                    <AdminAlbumUpdate album= {albumSelected}/>
                </Modal> 
            <h1 className="title">Administration des albums</h1>
            {localStorage.getItem("admin") ==="true" ?
            <div>
                <TextField
                name="filter"
                fullWidth
                label="Rechercher un album"
                onChange={onSearch}
                variant="filled"
                sx={{
                    /* marginBottom: "1rem", */
                    width: "40%",
                    backgroundColor: '#faf0e6',
                    textAlign: 'center',
                }}
                />
                <table className="adminTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Titre</th>
                            <th>Artiste</th>
                            <th>Année</th>
                            <th>Deleted</th>
                            <th>Editer</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            album.curent && album.curent.map((album) =>(
                                <tr key={album.id} className="">
                                    <td>{album.id}</td>
                                    <td>{album.attributes.title}</td>
                                    <td>{album.attributes.band.data? album.attributes.band.data.attributes.name : ""}</td>
                                    <td>{album.attributes.year}</td>
                                    <td>{album.attributes.deleted? "oui" : "non"}</td>
                                    <td><FontAwesomeIcon icon={faPenToSquare} className="edit" id="myBtn" onClick={()=>openModal(album)} /></td>
                                    <td><FontAwesomeIcon icon={faXmark} className="delete" onClick={()=>deleteAlbum(album.id)}/></td>
                                </tr>))}
                    </tbody>
                </table>
            </div> : window.location.href = "/"}
            <Footer></Footer>
        </div>
    );
}

export default AdminAlbum;





