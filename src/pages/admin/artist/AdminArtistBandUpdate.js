import { faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const AdminArtistBandUpdate =(data) =>{
    console.log(data);
    const [artistSelected, setArtistSelected] = useState(data);
    const [showList, setShowList] = useState(false);
    const [allBand, setAllBand] = useState()
    const [addIdBand, setIdAddBand] = useState(artistSelected.data.attributes.band_id.data.map((id)=> id.id));

    
    useEffect(() =>{
        axios.get(`http://localhost:1337/api/bands?sort=name`
        ).then((reponse) =>{
            setAllBand(reponse.data.data)
        }).catch(err =>{
            console.log(err)
        })
    },[]);

  

    const deleteBand = (idSelected) =>{
        artistSelected.data.attributes.band_id.data.splice(idSelected, 1);
        setArtistSelected(artistSelected);
        if (window.confirm("Voulez-vous supprimer ce groupe?")) { 
            axios.put(`http://localhost:1337/api/artists/${data.data.id}`, {
                data: {
                    band_id: artistSelected.data.attributes.band_id.data.map((id)=>id.id)
                }
            } ,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {
                window.location.reload(false);            }
            ).catch(err => {
                console.log(err);
            }
            );
        }

    }

    const addBand = (idBand) => {
        addIdBand[addIdBand.length] = idBand;
        axios.put(`http://localhost:1337/api/artists/${data.data.id}`, {
                data: {
                    band_id: addIdBand
                }
            } ,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {
                window.location.reload(false);
            }).catch(err => {
                console.log(err);
            });
    }

    return( 
        <div className="center adminUpdate">
            <h2 className="title">Groupe(s)</h2>
            {data.data.attributes.band_id.data && data.data.attributes.band_id.data!=0 ?
                <div>
                    <table className="adminTable">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nom</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.attributes.band_id.data.map((band, index) =>(
                                <tr key={index} className="">
                                    <td>{band && band.id}</td>
                                    <td>{band && band.attributes.name}</td>
                                    <td><FontAwesomeIcon icon={faXmark} className="delete" onClick={()=> {deleteBand(index)}} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> : <div className="center">Aucun groupe associé</div>}
                {showList && 
                    <div>
                        <table className="adminTable">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nom</th>
                                    <th>Ajouter</th>
                                </tr>
                            </thead>
                            <tbody>    
                                {allBand.map((band) =>(    
                                        <tr key={band.id} className="">
                                            <td>{band.id}</td>
                                            <td>{band.attributes.name}</td>
                                            <td><FontAwesomeIcon icon={faPlusCircle} className="ajouter" onClick={()=>addBand(band.id)} /></td>
                                        </tr>
                                    )) }
                            </tbody>
                               
                            
                        </table>
                    </div>
                }
                <button className="classBoutton" onClick={()=> setShowList(showList?false:true)}>{showList?"Annuler":"Ajouter un Groupe"}</button>
        </div>
    );

}

export default AdminArtistBandUpdate;