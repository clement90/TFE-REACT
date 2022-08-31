import axios from "axios";
import React, { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

const ShowBand = () => {
    const {bandId} = useParams();
    const [bandData, setBandData] = useState([]);

    const [update, setUpdate] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:1337/api/bands/${bandId}?populate=albums`)
            .then((response) => {
                setBandData(response.data.data);
            }).catch((error) => {
                console.log(error);
            }
            );
    }
    , []);

    const updateBand = () => {
        if(update === false){
            setUpdate(true);}
        else{
            setUpdate(false);
        }
    }

    const saveData = (data) => {
        axios.put(`http://localhost:1337/api/bands/${bandId}`, {
            "data": {
                name: data.name,
            }
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(function (response) {
                console.log(response);
            }
            ).catch(function (error) {
                console.log(error);
            }
            );
    }

    const deleteBand = () => {
        if(window.confirm("Voulez-vous supprimer ce groupe ?")){
            axios.put(`http://localhost:1337/api/bands/${bandId}`,{
                data: {
                    deleted: true
                }},{headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
            )
            .then(() =>{
                window.location.href = "/groupes";
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }


    return (
        <div className="App">
            <Navbar></Navbar>
            {!update? 
                <div>
                    <h1 className="title">{ bandData.attributes && bandData.attributes.name}</h1>
                    <h2 className="title">Albums : </h2>
                    {bandData.attributes && bandData.attributes.albums.data!=0? bandData.attributes.albums.data.map((album) => {
                        return (
                            <div className="album" key={album.id}>
                                <Link to={`/albums/${album.id}`}>
                                    <h2>{album.attributes.title}</h2>
                                </Link>
                            </div>
                        )
                    }): <h2>Aucun album pour ce groupe</h2>}
                </div>
            :
            <div>
                <form action="" className="updateGuitare">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={bandData.attributes.name} onChange={(e)=> setBandData({...bandData , name: e.target.value})}/>
                </form>
            </div>}
            <br /><br />
            {localStorage.getItem('token') && !update && 
            <div className="sousMenu">
                <a className='classBoutton' onClick={updateBand}>Mettre à jour</a>
                <a className='classBoutton' onClick={deleteBand} type="submit" >Supprimer</a>
            </div>}
            {localStorage.getItem('token') && update && 
            <div className="sousMenu">
            <a className="classBoutton" onClick={updateBand}>Annuler</a>
            <a href={`/groupes/${bandId}`} className="classBoutton" onClick={() => saveData(bandData)}>Sauvegarder</a>
            </div>}
            <br />
             <Link to={'/groupes'} className='classBoutton'>Tout les groupes</Link>
            <Footer></Footer>
        </div>);

}

export default ShowBand;