import axios from "axios";
import React, { useState, useEffect} from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

const NewArtist = () => {
    const [artist, setArtist] = useState([]);

    const saveData = (data) => {
        axios.post("http://localhost:1337/api/artists", {
            "data": {
                name: data.name,
                first_name: data.first_name,
                description: data.description,
                birthday: data.birthday
            }
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(function (response) {
            console.log(response);
        }   
        ).catch(function (error) {
            console.log(error);
        }
        );
    }


    return (
        <div className="App">
            <Navbar />
            <h1 className="title">Ajouter un artiste</h1>
            <form action="" className="updateGuitare">
                <div>
                    <label htmlFor="name">Nom : </label>
                    <input type="text" name="name" id="name" onChange={(e)=> setArtist({...artist, name: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="first_name">Prénom : </label>
                    <input type="text" name="first_name" id="first_name" onChange={(e)=> setArtist({...artist, first_name: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="birthday">Jour de naissance : </label>
                    <input type="date" name="birthday" id="birthday" onChange={(e)=> setArtist({...artist, birthday: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="description">Description : </label>
                    <textarea name="description" id="description" cols="30" rows="10" onChange={(e)=> setArtist({...artist, description: e.target.value})} />
                </div>
            </form>
            <a href={`/artists`} className="classBoutton" onClick={() =>  saveData(artist)}>Sauvegarder</a>
            <Footer />
        </div>
    );

}

export default NewArtist;