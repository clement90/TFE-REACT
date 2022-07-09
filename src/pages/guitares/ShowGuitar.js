import axios from "axios";
import React, { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";



const ShowGuitar = () => {

    // Variable qui va contenir les données de l'API
    const {guitarId} = useParams();
    const [guitarData, setGuitarData] = useState([]);
    const [allProducer, setAllProducer] = useState([]);

    // Variable pour l'update
    const [update, setUpdate] = useState(false);
    const [updateGuitarData, setUpdateGuitarData] = useState([]);

    // Fonction pour supprimer les données de l'API
    const deleteGuitar = (e) => {
        if(window.confirm("Voulez-vous supprimer cette guitare ?")){
            axios.put(`http://localhost:1337/api/guitars/${guitarId}`,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                data: {
                    deleted: true
                }
            }
            )
            .then(() =>{
                window.location.href = "/guitares";
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }

    
    // Fonction qui va récupérer les données de l'API
    useEffect(() =>{
        axios.get(`http://localhost:1337/api/guitars/${guitarId}?populate=producer`)
        .then((reponse) =>{
            setGuitarData(reponse.data.data.attributes);
            setUpdateGuitarData(reponse.data.data.attributes);
        })
        .catch(err =>{
            console.log(err)
        })
    },[]);

    useEffect(() =>{
        axios.get(`http://localhost:1337/api/producers?sort=name&populate=%2A`)
        .then((reponse) =>{
            setAllProducer(reponse.data.data);
        })
        .catch(err =>{
            console.log(err)
        })
    },[]);

    // Fonction qui permet d'afficher le menu d'update
    const updateGuitar = () => {
        if(update === false){
            setUpdate(true);}
        else{
            setUpdate(false);
        }
    }
    
    // Fonction qui permet de mettre à jour les données de l'API
    const saveData = (data) => {
        axios.put(`http://localhost:1337/api/guitars/${guitarId}`,{
            "data":{
                "name": data.name,
                "Year": data.year,
                "producer": data.producer}
            },{
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
            
            {!update? 
                <div>
                    <h1 className="title">{guitarData.producer && guitarData.producer.data!=null? guitarData.producer.data.attributes.name : "Pas de fabriquant attribué"}</h1>
                    <p>{guitarData.name} <br />{guitarData.year}</p>
                </div> 
            : 
                <div>
                    <form action="" className="updateGuitare">
                        <div>
                            <label htmlFor="nom">Nom : </label>
                            <input type="text" name="nom" id="nom" defaultValue={guitarData.name} onChange={(e)=> setUpdateGuitarData({...updateGuitarData , name: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="annee">Année : </label>
                            <input type="text" name="annee" id="annee" defaultValue={guitarData.year} onChange={(e)=> setUpdateGuitarData({...updateGuitarData , year: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="producer">Fabriquant : </label>
                            <select name="producer" id="producer" defaultValue={guitarData.producer && guitarData.producer.data != null? guitarData.producer.data.id : "def"} onChange={(e)=> setUpdateGuitarData({...updateGuitarData , producer: e.target.value})}>
                                <option value="def">--</option>
                                  {allProducer.map((producer) => !producer.attributes.deleted && <option key={producer.id} value={producer.id}>{producer.attributes.name}
                                </option>)}
                            </select>
                        </div>
                    </form>
                </div>   
                }
            
            <br /><br />
            {!update? 
            <div className="sousMenu">
                <a className='classBoutton' onClick={updateGuitar}>Mettre à jour</a>
                <a className='classBoutton' onClick={deleteGuitar} type="submit" >Supprimer</a>
            </div>
            : 
            <div className="sousMenu">
            <a className="classBoutton" onClick={updateGuitar}>Annuler</a>
            <a href={`/guitares/${guitarId}`} className="classBoutton" onClick={() => saveData(updateGuitarData)}>Sauvegarder</a>
            
            </div>}
            <br />
             <Link to={'/guitares'} className='classBoutton'>Toutes les guitares</Link> 
        <Footer></Footer>
        </div>
        
    );
    
}

export default ShowGuitar;