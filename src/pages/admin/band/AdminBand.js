import React, { useState } from "react";
import Footer from "../../../Components/Footer";
import Navbar from "../../../Components/Navbar";
import Modal from 'react-modal';
import AdminBandUpdate from "./AdminBandUpdate";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";

const AdminBand = () => {

    const [band, setBand] = useState([]);
    const [bandSelected, setBandSelected] = useState();
    

    Modal.setAppElement('#root');
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(band) {
        setIsOpen(true);
        setBandSelected(band);
    }

    
    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() =>{
        axios.get(`http://localhost:1337/api/bands?sort=name`)
        .then((reponse) =>{
            setBand({initial: reponse.data.data, curent: reponse.data.data});
        }).catch(err =>{
            console.log(err)
        })
    },[]);

    const deleteBand = (id) => {
        if(window.confirm("Voulez-vous supprimer ce Groupe ?")){
            axios.delete(`http://localhost:1337/api/bands/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {
                window.location.href = "/admin/bands";
            }).catch(err => {
                console.log(err);
            }); 
        }
    }

    const onSearch = (input) => {
        setBand({
          ...band,
          curent: band.initial.filter((element) => {
            if (input.target.value === "") {
              return element;
            } else {
              let nameCheck = false;
              let idCheck = false;
              if (element.attributes.name) {
                nameCheck = element.attributes.name
                  .toLowerCase()
                  .includes(input.target.value.toLowerCase());
              }
                if (element.id){
                    idCheck = element.id.toString().includes(input.target.value.toLowerCase());
                }
              return nameCheck || idCheck;
            }
          }),
        });
        }
  
  return (
        <div className="App">
            <Navbar></Navbar>
            <h1 className="title">Administration des groupes</h1>
            {localStorage.getItem("admin") ==="true" ?
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="modal"
                    contentLabel="Modal"
                    overlayClassName="overlay"
                >
                    <AdminBandUpdate band= {bandSelected}/>
                </Modal> 
                <TextField
                    name="filter"
                    fullWidth
                    label="Rechercher un groupe"
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
                            <th>Deleted</th>
                            <th>Editer</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            band.curent && band.curent.map((band) =>(
                                <tr key={band.id} className="">
                                    <td>{band.id}</td>
                                    <td>{band.attributes.name}</td>
                                    <td>{band.attributes.deleted? "oui" : "non"}</td>
                                    <td><FontAwesomeIcon icon={faPenToSquare} className="edit" id="myBtn" onClick={()=>openModal(band)} /></td>
                                    <td><FontAwesomeIcon icon={faXmark} className="delete" onClick={()=>deleteBand(band.id)}/></td>
                                </tr>))}
                    </tbody>
                </table>
            </div> : window.location.href = "/"}
            <Footer></Footer>
        </div>
    );
}

export default AdminBand;





