import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

const NewAlbum = () => {
    const [albumData, setAlbumData] = useState([]);
    const [bandData, setBandData] = useState([]);

    useEffect(() =>{
        axios.get(`http://localhost:1337/api/bands?sort=name`)
        .then((reponse) =>{
            setBandData(reponse.data.data);
        })
        .catch(err =>{
            console.log(err)
        })
    },[]);

    const saveData = (data) => {
        axios.post(`http://localhost:1337/api/albums`,{  
            "data" :{
                title: data.title,
                year: data.year,
                songs: data.songs,
                band: data.band
                } 
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function (response) {
            console.log(response);
            
            })
            .catch(function (error) {
            console.log(error);});
    }
        

    
    return (
        <div className="App">
            <Navbar></Navbar>
            <h1 className="title">Ajouter un album</h1>
            <form action="" className="updateGuitare">
                        <div>
                            <label htmlFor="groupName">Groupe :</label>
                            <select name="groupeName" id="groupeName" defaultValue={albumData.band && albumData.band.data!=null && albumData.band.data.id} onChange={(e) => setAlbumData({...albumData, band: e.target.value})}>
                                <option value="">Choisir un groupe</option>
                                {bandData.map((band) => <option key={band.id} value={band.id}>{band.attributes.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="title">Titre :</label>
                            <input type="text" name="title" id="title" defaultValue={albumData.title} onChange={(e) => setAlbumData({...albumData, title: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="year">Année :</label>
                            <input type="date" name="year" id="year" defaultValue={albumData.year} onChange={(e) => setAlbumData({...albumData, year: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="songs">Titres :</label>
                            <textarea name="songs" id="songs" cols="30" rows="10" defaultValue={albumData.songs} onChange={(e) => setAlbumData({...albumData, songs: e.target.value})}></textarea>
                        </div>
                    </form>
                    <a href={`/albums`} className="classBoutton" onClick={() =>  saveData(albumData)}>Sauvegarder</a>
            <Footer></Footer>
        </div>
    );
};

export default NewAlbum;