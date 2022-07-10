import React, { useState } from "react";
import Footer from "../../../Components/Footer";
import Navbar from "../../../Components/Navbar";
import Modal from 'react-modal';
import { useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import AdminProducerUpdate from "./AdminProducerUpdate";
import AdminProducerNew from "./AdminProducerNew";

const AdminProducer = () => {
    const [producer, setProducer] = useState([]);
    const [producerSelected, setProducerSelected] = useState();

    Modal.setAppElement('#root');

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpenNew, setIsOpenNew] = useState(false);
    
    const openModal =(producer) => {
        setIsOpen(true);
        setProducerSelected(producer);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModalNew = () => {
        setIsOpenNew(true);
    }

    const closeModalNew = () => {
        setIsOpenNew(false);
    }
    

    useEffect(() => {
        axios.get(`http://localhost:1337/api/producers?sort=name`
        ).then(reponse => {
                setProducer({initial: reponse.data.data, curent: reponse.data.data});
            }).catch(err => {
                console.log(err);
            });
    }, []);

    const deleteProducer = (id) => {
        if (window.confirm("Voulez-vous supprimer ce Producteur ?")) {
            axios.delete(`localhost:3000/api/producer/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {
                window.location.href = "/admin/producer";
            }).catch(err => {
                console.log(err);
            });
        }
    }

    const onSearch = (input) => {
        setProducer({
            ...producer,
            curent: producer.initial.filter((element) => {
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

   

    return (
        <div className="App">
            <Navbar />
            <h1 className="title">Liste des fabricants</h1>
            {localStorage.getItem("admin") ==="true" ?
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="modal"
                    contentLabel="Modal"
                    overlayClassName="overlay"
                >
                    <AdminProducerUpdate producer= {producerSelected}/>
                </Modal> 
                <Modal
                    isOpen={modalIsOpenNew}
                    onRequestClose={closeModalNew}
                    className="modal"
                    contentLabel="Modal"
                    overlayClassName="overlay"
                >
                    <AdminProducerNew/>
                </Modal> 
                <div className="searchAdd">
                <TextField
                    name="filter"
                    fullWidth
                    label="Rechercher un fabricant"
                    onChange={onSearch}
                    variant="filled"
                    sx={{
                        width: "40%",
                        backgroundColor: '#faf0e6',
                        textAlign: 'center',
                    }}
                />
                <button className="classBoutton" onClick={openModalNew}>Ajouter un fabricant</button>
                </div>
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
                            producer.curent && producer.curent.map((producer) =>(
                                <tr key={producer.id} className="">
                                    <td>{producer.id}</td>
                                    <td>{producer.attributes.name}</td>
                                    <td>{producer.attributes.deleted? "oui" : "non"}</td>
                                    <td><FontAwesomeIcon icon={faPenToSquare} className="edit" id="myBtn" onClick={()=>openModal(producer)} /></td>
                                    <td><FontAwesomeIcon icon={faXmark} className="delete" onClick={()=>deleteProducer(producer.id)}/></td>
                                </tr>))}
                    </tbody>
                </table>
            </div> : window.location.href = "/"}
            <Footer />
        </div>
        );
            
}



export default AdminProducer;