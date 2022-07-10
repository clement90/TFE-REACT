import axios from "axios";
import React, { useState } from "react";

const AdminArtistUpdate = (artist) => {
    const [updateArtist, setUpdateArtist] = useState(artist.artist.attributes);
    const [allProducer, setAllProducer] = useState([]);

    const saveData = () => {
        
        axios.put(`http://localhost:1337/api/artists/${artist.artist.id}`, {
            data: {
                name: updateArtist.name,
                first_name: updateArtist.first_name,
                birthday: updateArtist.birthday,
                description: updateArtist.description,
                deleted: updateArtist.deleted
                
            }
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) =>{
                console.log(response);
                window.location.href = "/admin/artistes";
            }).catch(err =>{
                console.log(err)
            })
    }


    return (
        <div className="center adminUpdate">
            <h2 className="title">Editer</h2>
            <form className="formUpdate">
                <div>
                    <label htmlFor="nom">Nom : </label>
                    <input type="text" name="nom" id="nom" defaultValue={updateArtist.name} onChange={(e) => setUpdateArtist({...updateArtist, name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="prenom">Prenom : </label>
                    <input type="text" name="prenom" id="prenom" defaultValue={updateArtist.first_name} onChange={(e) => setUpdateArtist({...updateArtist, first_name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="birthday">Date de naissance : </label>
                    <input type="date" name="birthday" id="birthday" defaultValue={updateArtist.birthday} onChange={(e) => setUpdateArtist({...updateArtist, birthday: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="description">Description : </label>
                    <textarea name="description" id="description" defaultValue={updateArtist.description} cols="40" rows="10" onChange={(e) => setUpdateArtist({...updateArtist, description: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="deleted">Deleted : </label>
                    <input type="checkbox" name="deleted" id="deleted" defaultChecked={updateArtist.deleted} onChange={(e) => setUpdateArtist({...updateArtist, deleted: !updateArtist.deleted})}/>
                </div>
            </form>
            <a  className="classBoutton" onClick={saveData}>Sauvegarder</a>
        </div>
    );
    }
    export default AdminArtistUpdate;