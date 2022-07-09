import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

const NewGuitar = () => {
    const [name, setName] = useState([]);
    const [year , setYear] = useState([]);
    const [producer , setProducer] = useState([]);
    const [allProducer , setAllProducer] = useState([]);

    //Récuperation des producers
    useEffect(() => {
        axios.get(`http://localhost:1337/api/producers?sort=name&populate=%2A`)
        .then((reponse) =>{
            setAllProducer(reponse.data.data);
        })
        .catch(err =>{
            console.log(err)
        })
    }, []);

    //Enregistrement d'une nouvelle guitare
    const enregistrer= () => {
        axios.post(`http://localhost:1337/api/guitars`, {
            "data" :{
                "name": name,
                "year": year,
                "producer": producer
            } 
        }, 
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((reponse) =>{
            console.log(reponse)
        }).catch(err =>{
            console.log(err)
        })
    };

    return (
        <div className="App">
            <Navbar></Navbar>
        <h1 className="title">Ajouter une nouvelle guitare</h1>
        <div>
                    <form action="" className="updateGuitare">
                        <div>
                            <label htmlFor="nom">Nom : </label>
                            <input type="text" name="nom" id="nom"  onChange={(e)=> setName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="annee">Année : </label>
                            <input type="text" name="annee" id="annee"  onChange={(e) => setYear(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="producer">Fabriquant : </label>
                            <select name="producer" id="producer" onChange={(e) => setProducer(e.target.value)}>
                                <option value="">--</option>
                            {allProducer.map((producer) => !producer.attributes.deleted && <option key={producer.id} value={producer.id}>{producer.attributes.name}</option>)}</select>
                        </div>
                        
                    </form>
                    <div className="center">
                        <a href="/guitares"className="classBoutton" onClick={enregistrer}>Enregistrer</a>
                    </div>
                </div>  
                <Footer></Footer>
        </div>
    );
};

export default NewGuitar;