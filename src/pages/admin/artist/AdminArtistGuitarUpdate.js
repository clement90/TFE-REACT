import { faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";


const AdminArtistGuitarUpdate = (data) => {
    const [artistSelected, setArtistSelected] = useState(data);
    const [showList, setShowList] = useState(false);
    const [allGuitar, setAllGuitar] = useState([]);
    const [addIdGuitar, setIdAddGuitar] = useState(artistSelected.data.attributes.guitar_id.data.map((id)=> id.id));

    useEffect(() =>{
        axios.get(`http://localhost:1337/api/guitars?sort=producer.name&populate=producer&sort=name&sort=year`)
        .then((reponse) =>{
            setAllGuitar({initial: reponse.data.data, curent: reponse.data.data});
        }).catch(err =>{
            console.log(err)
        })
    },[]);

    const deleteGuitar = (idSelected) => {
        /* guitarSelected.data.attributes.guitar_id.data.splice(idSelected, 1); */
        artistSelected.data.attributes.guitar_id.data.splice(idSelected, 1);
        setArtistSelected(artistSelected);
        if (window.confirm("Voulez-vous supprimer cette guitare ?")) { 
            axios.put(`http://localhost:1337/api/artists/${data.data.id}`, {
                data: {
                    guitar_id: artistSelected.data.attributes.guitar_id.data.map((id)=>id.id)
                }
            } ,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {
                window.location.reload(false);
                /* window.location.href = "/admin/artistes"; */
            }
            ).catch(err => {
                console.log(err);
            }
            );
        }
    }
    

    const addGuitar = (idGuitar) =>{
        addIdGuitar[addIdGuitar.length] = idGuitar;
        axios.put(`http://localhost:1337/api/artists/${data.data.id}`, {
                    data: {
                        guitar_id: addIdGuitar
                    }
                } ,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }).then(() => {
                    window.location.reload(false);
                    /* window.location.href = "/admin/artistes"; */
                }).catch(err => {
                    console.log(err);
                });        
        }
    

    /* const changeArtist = (e) => {
        setGuitarSelected({
            ...guitarSelected,
            data: {
                ...guitarSelected.data,
                attributes: {
                    ...guitarSelected.data.attributes,
                    artist_id: {
                        data: {
                            id: ""
                        }
                    }
                }
            }
        });
    } */

    const onSearch = (input) => {
        setAllGuitar({
            ...allGuitar,
            curent: allGuitar.initial.filter((element) => {
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
        <div className="center adminUpadte">
            <h2 className="title">Guitare</h2>
            {data.data.attributes.guitar_id.data && data.data.attributes.guitar_id.data!=0 ?
                <div>
                    <table className="adminTable">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Fabricant</th>
                                <th>Nom</th>
                                <th>Année</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>    
                        <tbody>
                            {data.data.attributes.guitar_id.data.map((guitar, index) =>(
                                <tr key={index} className="">
                                    <td>{guitar && guitar.id}</td>
                                    <td>{guitar && guitar.attributes.producer.data && guitar.attributes.producer.data.attributes.name}</td>
                                    <td>{guitar && guitar.attributes.name}</td>
                                    <td>{guitar && guitar.attributes.year}</td>
                                    {/* <td><FontAwesomeIcon icon={faXmark} className="delete" onClick={()=> {deleteGuitar(guitar.id); setGuitarSelected({...guitarSelected.data.attributes.guitar_id.data[index], id: null})}} /></td> */}
                                    <td><FontAwesomeIcon icon={faXmark} className="delete" onClick={()=> {deleteGuitar(index)}} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> : <div className="center">Aucune guitare associé</div>}
                {showList && 
                    <div>
                        <TextField
                            name="filter"
                            fullWidth
                            label="Rechercher une guitare"
                            onChange={onSearch}
                            variant="filled"
                            sx={{
                                /* marginBottom: "5px", */
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
                                    <th>Ajouter</th>
                                    
                                </tr>
                            </thead>
                                {allGuitar.curent && allGuitar.curent.map((guitar) =>(
                                    <tbody key={guitar.id}>
                                        {!guitar.attributes.producer.data || guitar.attributes.deleted? "":
                                        <tr className="">
                                            <td>{guitar.id}</td>
                                            <td>{guitar.attributes.producer.data? guitar.attributes.producer.data.attributes.name : ""}</td>
                                            <td>{guitar.attributes.name}</td>
                                            <td>{guitar.attributes.year}</td>
                                            <td><FontAwesomeIcon icon={faPlusCircle} className="ajouter" onClick={()=>addGuitar(guitar.id)} /></td>
                                        </tr>}
                                    </tbody>))
                                }
                            
                        </table>
                    </div>
                }
                <button className="classBoutton" onClick={()=> setShowList(showList?false:true)}>{showList?"Annuler":"Ajouter une guitare"}</button>
        </div>)
    }
export default AdminArtistGuitarUpdate;