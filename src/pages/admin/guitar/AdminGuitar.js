import React, { useState } from "react";
import Footer from "../../../Components/Footer";
import Navbar from "../../../Components/Navbar";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import AdminGuitarUpdate from "./AdminGuitarUpdate";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";

const AdminGuitar = () => {

    const [guitar, setGuitar] = useState([]);
    const [guitarSelected, setGuitarSelected] = useState();
    

    Modal.setAppElement('#root');
  
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(guitar) {
        setIsOpen(true);
        setGuitarSelected(guitar);
    }

    
    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() =>{
        axios.get(`http://localhost:1337/api/guitars?sort=producer.name&populate=producer&sort=name&sort=year`)
        .then((reponse) =>{
            setGuitar({initial: reponse.data.data, curent: reponse.data.data});
        }).catch(err =>{
            console.log(err)
        })
    },[]);

    const deleteGuitar = (id) => {
        if(window.confirm("Voulez-vous supprimer cette guitare ?")){
            axios.delete(`http://localhost:1337/api/Guitars/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {
                window.location.href = "/admin/guitares";
            }).catch(err => {
                console.log(err);
            }); 
        }
    }

    const onSearch = (input) => {
        setGuitar({
            ...guitar,
            curent: guitar.initial.filter((element) => {
                if (input.target.value === "") {
                    return element;
                } else {
                    let nameCheck = false;
                    let yearCheck = false;
                    let producerCheck = false;
                    let idCheck = false;
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
                        if (element.id){
                            idCheck = element.id.toString().includes(input.target.value.toLowerCase());
                        }
                    return nameCheck || yearCheck || producerCheck || idCheck;
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
                    <AdminGuitarUpdate guitar= {guitarSelected}/>
                </Modal> 
            <h1 className="title">Administration des guitares</h1>
            {localStorage.getItem("admin") ==="true" ?
            <div>
                <TextField
                name="filter"
                fullWidth
                label="Rechercher une guitare"
                onChange={onSearch}
                variant="filled"
                sx={{
                    /* marginBottom: "2rem", */
                    width: "40%",
                    backgroundColor: '#faf0e6',
                    textAlign: 'center',
                }}
            />
                <table className="adminTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fabricant</th>
                            <th>Nom</th>
                            <th>Année</th>
                            <th>Deleted</th>
                            <th>Editer</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            guitar.curent && guitar.curent.map((guitar) =>(
                                <tr key={guitar.id} className="">
                                    <td>{guitar.id}</td>
                                    <td>{guitar.attributes.producer.data? guitar.attributes.producer.data.attributes.name : ""}</td>
                                    <td>{guitar.attributes.name}</td>
                                    <td>{guitar.attributes.year}</td>
                                    <td>{guitar.attributes.deleted? "oui" : "non"}</td>
                                    <td><FontAwesomeIcon icon={faPenToSquare} className="edit" id="myBtn" onClick={()=>openModal(guitar)} /></td>
                                    <td><FontAwesomeIcon icon={faXmark} className="delete" onClick={()=>deleteGuitar(guitar.id)}/></td>
                                </tr>))}
                    </tbody>
                </table>
            </div> : window.location.href = "/"}
            <Footer></Footer>
        </div>
    );
}

export default AdminGuitar;





