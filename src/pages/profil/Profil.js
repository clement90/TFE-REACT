import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import Modal from 'react-modal';
import UpdateProfil from "./UpdateProfil";
import ChangePassword from "./ChangePassword";


const Profil = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:1337/api/users/me`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((reponse) => {
            setUser(reponse.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    Modal.setAppElement('#root');
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
  
      function openModal(user) {
          setIsOpen(true);
      }

      function closeModal() {
        setIsOpen(false);
      }

    function openModal2(user) {
        setIsOpen2(true);
    }

    function closeModal2() {
        setIsOpen2(false);
    }
    

    return (
        <div className="App">
            <Modal
                    isOpen={modalIsOpen}
                    /* onAfterOpen={afterOpenModal} */
                    onRequestClose={closeModal}
                    className="modal"
                    contentLabel="Modal"
                    overlayClassName="overlay"
                >
                    <UpdateProfil user= {user}/>
                </Modal>
                <Modal
                    isOpen={modalIsOpen2}
                    /* onAfterOpen={afterOpenModal} */
                    onRequestClose={closeModal2}
                    className="modal"
                    contentLabel="Modal"
                    overlayClassName="overlay"
                >
                    <ChangePassword user= {user}/>
                </Modal>  
            <Navbar></Navbar>
            <h1 className="title">Votre profile</h1>
            <div className="profil">
                <table className="tableProfil">
                    <thead>
                        <tr>
                            <th></th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nom D'utilisateur : </td>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <td>Prénom : </td>
                            <td>{user.first_name}</td>
                        </tr>
                        <tr>
                            <td>Nom : </td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td>Email : </td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Rôle : </td>
                            <td>{user.admin? "Administrateur" : "Utilisateur"}</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            <a className="classBoutton" onClick={openModal}>Mettre à jour</a>
            <a className="classBoutton" onClick={openModal2}>Changer mot de passe</a>
        <Footer></Footer>
        </div>
    );

    }
export default Profil;