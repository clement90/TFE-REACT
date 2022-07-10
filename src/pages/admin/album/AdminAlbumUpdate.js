import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";


const AdminAlbumUpdate = (album) => {
    const [updateAlbum, setUpdateAlbum] = useState(album.album.attributes);
    const [allBand, setAllBand] = useState([]);
    const [bandOptions, setBandOptions] = useState([]);

    useEffect (() => {
        axios.get(`http://localhost:1337/api/bands?sort=name`).then((reponse) =>{
            setAllBand(reponse.data.data);
        }).catch(err =>{
            console.log(err)
        })
    },[]);

    const saveData = () => {
        axios.put(`http://localhost:1337/api/albums/${album.album.id}`, {
            data: {
                title: updateAlbum.title,
                year: updateAlbum.year,
                songs: updateAlbum.songs,
                band: parseInt(updateAlbum.band)?parseInt(updateAlbum.band):album.album.attributes.band.id,
                deleted: updateAlbum.deleted
            }
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) =>{
                console.log(response);
                window.location.href = "/admin/albums";
            }).catch(err =>{
                console.log(err)
            })
    }

    return (
        <div className="center adminUpdate" id="">
            <h2 className="title">Editer</h2>
            <form className="formUpdate">
                <div>
                    <label htmlFor="adminAlbum">Groupe : </label>
                    <select name="adminAlbum" id="adminAlbum" defaultValue={updateAlbum.band && updateAlbum.band.data!=null && updateAlbum.band.data.id} onChange={(e) => setUpdateAlbum({...updateAlbum, band: e.target.value})}>
                        <option value="" disabled hidden selected>Choisir un groupe</option>
                        {allBand.map((band) => band.id && <option key={band.id} value={band.id} selected={updateAlbum.band.data!=null && updateAlbum.band.data.id &&  band.id == updateAlbum.band.data.id}>{band.attributes.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="title">Titre : </label>
                    <input type="text" name="title" id="title" defaultValue={updateAlbum.title} onChange={(e) => setUpdateAlbum({...updateAlbum, title: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="year">Année : </label>
                    <input type="date" name="year" id="year" defaultValue={updateAlbum.year} onChange={(e) => setUpdateAlbum({...updateAlbum, year: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="description">Chansons : </label>
                    <textarea name="description" id="description" cols="40" rows="10" defaultValue={updateAlbum.songs} onChange={(e) => setUpdateAlbum({...updateAlbum, songs: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="deleted">Deleted : </label>
                    <input type="checkbox" name="deleted" id="deleted" defaultChecked={updateAlbum.deleted} onChange={(e) => setUpdateAlbum({...updateAlbum, deleted: !updateAlbum.deleted})}/>
                </div>
            </form>
            <a  className="classBoutton" onClick={saveData}>Sauvegarder</a>
        </div>
    );
}

export default AdminAlbumUpdate;