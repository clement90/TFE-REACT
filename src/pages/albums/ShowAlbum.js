import axios from "axios";
import React, { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";



const ShowAlbum = () => {

    //Variable qui va stocker les données de l'album
    const {albumId} = useParams();
    const [albumData, setAlbumData] = useState([]);
    const [update, setUpdate] = useState(false);

    
    const date = new Date(albumData.year);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    //Variable pour l'update
    const [updateAlbumData, setupdateAlbumData] = useState([]);
    const [allBand, setAllBand] = useState([]);

    const updateAlbum = () => {
        if(update === false){
            setUpdate(true);
        }else{
            setUpdate(false);
        }
    }

    const deleteAlbum = (e) => {
        if(window.confirm("Voulez-vous supprimer cet album ?")){
            axios.put(`http://localhost:1337/api/albums/${albumId}`, {
                data: {
                    deleted: true
                }},{headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(() =>{
                window.location.href = "/albums";
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }
    
    useEffect(() =>{
        axios.get(`http://localhost:1337/api/albums/${albumId}?populate=band`)
        .then((reponse) =>{
            setAlbumData(reponse.data.data.attributes);  
            setupdateAlbumData(reponse.data.data.attributes); 
        })
        .catch(err =>{
            console.log(err)
        })
    },[]);

    useEffect(() =>{
        axios.get(`http://localhost:1337/api/bands?sort=name`)
        .then((reponse) =>{
            setAllBand(reponse.data.data);
        })
        .catch(err =>{
            console.log(err)
        })
    },[]);

    const saveData = (data) => {
        axios.put(`http://localhost:1337/api/albums/${albumId}`,{  
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
        <div className='App'>
            <Navbar></Navbar>
             

               {update === false?
               <div>
                <h1 className='title'>{albumData.band && albumData.band.data!=null? albumData.band.data.attributes.name : "Pas de groupe associé"}</h1>
                <h2 className="title">{albumData.title}</h2>
                <p>Date de sortie : {date && date.toLocaleDateString(undefined, options)} </p>
                <div className="listSong">
                <h3 className="center underligne">Titres :</h3>
                <br />
                <hr />
                <br />
                <p>{albumData.songs? albumData.songs.split("\n").map((song, index) => <li key={index} className="song">{song}</li>):""}</p>
                </div>
                {localStorage.getItem("token") &&
                    <div className="sousMenu">
                        <a className="classBoutton" onClick={updateAlbum} >Modifier</a>
                        <a onClick={deleteAlbum} className="classBoutton">Supprimer</a>
                    </div>}
               </div> 
               :
                <div>
                    <form action="" className="updateGuitare">
                        <div>
                            <label htmlFor="groupName">Groupe :</label>
                            <select name="groupeName" id="groupeName" defaultValue={albumData.band && albumData.band.data!=null && albumData.band.data.id} onChange={(e) => setupdateAlbumData({...updateAlbumData, band: e.target.value})}>
                                <option value="">Choisir un groupe</option>
                                {allBand.map((band) => <option key={band.id} value={band.id}>{band.attributes.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="title">Titre :</label>
                            <input type="text" name="title" id="title" defaultValue={albumData.title} onChange={(e) => setupdateAlbumData({...updateAlbumData, title: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="year">Année :</label>
                            <input type="date" name="year" id="year" defaultValue={albumData.year} onChange={(e) => setupdateAlbumData({...updateAlbumData, year: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="songs">Titres :</label>
                            <textarea name="songs" id="songs" cols="30" rows="10" defaultValue={albumData.songs} onChange={(e) => setupdateAlbumData({...updateAlbumData, songs: e.target.value})}></textarea>
                        </div>
                    </form>
                    {localStorage.getItem("token") &&
                        <div className="sousMenu"><br /> <br /> 
                        <a onClick={updateAlbum} className="classBoutton">Annuler</a>
                        <a href={`/albums/${albumId}`} className="classBoutton" onClick={() =>  saveData(updateAlbumData)}>Sauvegarder</a>
                        </div>}
                </div>}
            <br />
            <Link to={'/albums'} className='classBoutton'>Tous les albums</Link>
            <Footer></Footer>
        </div>
    )
    
}

export default ShowAlbum;