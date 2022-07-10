import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../../Components/Footer";
import Navbar from "../../../Components/Navbar";
import AdminArticleUpdate from "./AdminArticleUpdate";
import { TextField } from "@mui/material";
import AdminArticleNew from "./AdminArticleNew";

const AdminArticle = () => { 
    const [article, setArticle] = useState([]);
    const [articleSelected, setArticleSelected] = useState();

    useEffect(() => {
        axios.get(`http://localhost:1337/api/articles?sort=createdAt:desc&populate=author`)
        .then((reponse) => {
            setArticle({initial: reponse.data.data, curent: reponse.data.data});
        }
        ).catch(err => {
            console.log(err);
        }
        );
    }, []);

    const onSearch = (input) => {
        setArticle({
            ...article,
            curent: article.initial.filter((element) => {
                if (input.target.value === "") {
                    return element;
                } else {
                    let idCheck = false;
                    let titleCheck = false;
                    let articleCheck = false;
                    let authorCheck = false;
                    if (element.id){
                        idCheck = element.id.toString().includes(input.target.value);
                    }
                    if (element.attributes.title) {
                        titleCheck = element.attributes.title
                            .toLowerCase()
                            .includes(input.target.value.toLowerCase());
                    }
                    if (element.attributes.article) {
                        articleCheck = element.attributes.article
                            .toLowerCase()
                            .includes(input.target.value.toLowerCase());
                    }
                    if (element.attributes.author.data) {
                        authorCheck = element.attributes.author.data.attributes.username
                            .toLowerCase()
                            .includes(input.target.value.toLowerCase());
                    }
                    return titleCheck || articleCheck || idCheck || authorCheck;
                }
                
            }
            ),
        });
    }

    const deleteArticle = (id) => {
        if(window.confirm("Voulez-vous supprimer ce guitariste ?")){
            axios.delete(`http://localhost:1337/api/articles/${id}`)
            .then((reponse) => {
                console.log(reponse);
                window.location.href = "/admin/articles";
            }).catch(err => {
                console.log(err);
            });
        }
    }


    Modal.setAppElement('#root');
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpenNew, setIsOpenNew] = useState(false);
    
    
    const openModal =(article) => {
        setIsOpen(true);
        setArticleSelected(article);
        console.log(article);    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModalNew = () => {
        setIsOpenNew(true);
    }

    const closeModalNew = () => {
        setIsOpenNew(false);
    }

    
    return( 
    <div className="App">
        <Navbar></Navbar>
         <h1 className="title">Administration des articles</h1>
         {localStorage.getItem("admin") ==="true" ?
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="modalArticle"
                    contentLabel="Modal"
                    overlayClassName="overlay"
                >
                    <AdminArticleUpdate article= {articleSelected}/>
                </Modal>
                <Modal
                    isOpen={modalIsOpenNew}
                    onRequestClose={closeModalNew}
                    className="modalArticle"
                    contentLabel="Modal"
                    overlayClassName="overlay"
                >
                    <AdminArticleNew/>
                </Modal>
                <div className="searchAdd"> 
                <TextField
                    name="filter"
                    fullWidth
                    label="Rechercher un article"
                    onChange={onSearch}
                    variant="filled"
                    sx={{
                        width: "40%",
                        backgroundColor: '#faf0e6',
                        textAlign: 'center',
                    }}
                />
                <button className="classBoutton" onClick={openModalNew}>Ajouter un article</button>
                </div>
                <table className="adminTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Titre</th>
                            <th>Auteur</th>
                            <th>Date de création</th>
                            <th>Deleted</th>
                            <th>Editer</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            article.curent && article.curent.map((article, index) =>(
                                <tr key={article.id} className="">
                                    <td>{article.id}</td>
                                    <td>{article.attributes.title}</td>
                                    <td>{article.attributes.author.data && article.attributes.author.data.attributes.username}</td>
                                    <td>{article.attributes.createdAt}</td>
                                    <td>{article.attributes.deleted? "oui" : "non"}</td>
                                    <td><FontAwesomeIcon icon={faPenToSquare} className="edit" onClick={()=>openModal(article)} /></td>
                                    <td><FontAwesomeIcon icon={faXmark} className="delete" onClick={()=>deleteArticle(article.id)}/></td>
                                </tr>))}
                    </tbody>
                </table>
            </div> : window.location.href = "/"}
         <Footer></Footer> 
    </div>
    ); 
    
}

export default AdminArticle;