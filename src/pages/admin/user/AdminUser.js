import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../Components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import Footer from "../../../Components/Footer";
import AdminUserUpdate from "./AdminUserUpdate";
import Modal from 'react-modal';
import { TextField } from "@mui/material";

const AdminUser = () =>{


    const [user, setUser] = useState([]);
    const [userSelected, setUserSelected] = useState([]);
    
    /* Modal */
    Modal.setAppElement('#root');
 
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(user) {
        setIsOpen(true);
        setUserSelected(user);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        axios.get(`http://localhost:1337/api/users`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((reponse) => {
            setUser({initial: reponse.data, curent: reponse.data});
        }).catch(err => {
            console.log(err);
        });
        
    }, []);

    const deleteUser = (id) => {
            if(window.confirm("Voulez-vous supprimer cet utilisateur ?")){
            axios.delete(`http://localhost:1337/api/users/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {
                window.location.href = "/admin/users";
            }).catch(err => {
                console.log(err);
            });
        }
    }

    const onSearch = (input) => {
        setUser({
            ...user,
            curent: user.initial.filter((element) => {
                if (input.target.value === "") {
                    return element;
                } else {
                    let usernameCheck = false;
                    let emailCheck = false;
                    let idCheck = false;
                    if (element.username) {
                        usernameCheck = element.username
                        .toLowerCase()
                        .includes(input.target.value.toLowerCase());
                    }
                    if (element.id){
                        idCheck = element.id.toString().includes(input.target.value.toLowerCase());
                    }
                    if (element.email){
                        emailCheck = element.email.toString().includes(input.target.value.toLowerCase());
                    }
                    return usernameCheck || idCheck || emailCheck;
                }
            }),
        });
    };

    return (
    <div className="App">
        <Navbar></Navbar>
        <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="modal"
                    contentLabel="Modal"
                    overlayClassName="overlay"
                >
                    <AdminUserUpdate user= {userSelected}/>
                </Modal>  
        <h1 className="title">Administration des utilisateurs</h1>
        {localStorage.getItem("admin") ==="true" ?
        <div >
            <TextField
                name="filter"
                fullWidth
                label="Rechercher un utilisateur"
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
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Bloque</th>
                        <th>Rôle</th>
                        <th>Editer</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {user.curent && user.curent.map((user) => (<tr className='adminLine'key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.blocked ? "Oui" : "Non"}</td>
                        <td>{user.admin? "Administrateur" : "Utilisateur"}</td>
                        <td><FontAwesomeIcon icon={faPenToSquare} className="edit" id="myBtn" onClick={()=>openModal(user)} /></td>
                        <td><FontAwesomeIcon icon={faXmark} className="delete" onClick={()=>deleteUser(user.id)}/></td>
                    </tr>))}
                </tbody>    
            </table>
        </div> : window.location.href = "/"}
        <Footer></Footer>
    </div>
    );

}

export default AdminUser;