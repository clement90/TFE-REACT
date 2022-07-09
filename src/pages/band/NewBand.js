import axios from "axios";
import React, { useState, useEffect} from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

const NewBand = () => {
    const [bandData, setBandData] = useState([]);

    const saveData = (data) => {
        axios.post(`http://localhost:1337/api/bands`, {
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


    return (
        <div className="App">
            <Navbar></Navbar>
            <h1 className="title">Ajouter un groupe</h1>
            <form action="" className="updateGuitare">
                <div>
                    <label htmlFor="name">Nom du groupe :</label>
                    <input type="text" name="name" id="name" onChange={(e) => setBandData({...bandData, name: e.target.value})}/>
                </div>
            </form>
            <a href={`/groupes`} className="classBoutton" onClick={() =>  saveData(bandData)}>Sauvegarder</a>
            <Footer></Footer>
        </div>
    );
}

export default NewBand;