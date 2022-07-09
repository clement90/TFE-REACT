import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";


const AdminGuitarUpdate = (guitar) => {
    const [updateGuitar, setUpdateGuitar] = useState(guitar.guitar.attributes);
    const [allProducer, setAllProducer] = useState([]);

    useEffect (() => {
        axios.get(`http://localhost:1337/api/producers?sort=name`).then((reponse) =>{
            setAllProducer(reponse.data.data);
        }).catch(err =>{
            console.log(err)
        })
    },[]);

    const saveData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:1337/api/guitars/${guitar.guitar.id}`, {
            data: {
                name: updateGuitar.name,
                year: updateGuitar.year,
                deleted: updateGuitar.deleted,
                producer: parseInt(updateGuitar.producer)?parseInt(updateGuitar.producer):guitar.guitar.attributes.producer.id,
            }
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) =>{
                console.log(response);
                window.location.href = "/admin/guitares";
            }).catch(err =>{
                console.log(err)
            })
    }


    return (
        <div className="center adminUpdate">
            <h2 className="title">Editer</h2>
            <form className="formUpdate">
                <div>
                    <label htmlFor="producer">Fabricant : </label>
                    <select name="producer" id="producer" defaultValue={updateGuitar.producer && updateGuitar.producer.data!=null && updateGuitar.producer.data.id} onChange={(e) => setUpdateGuitar({...updateGuitar, producer: e.target.value})}>
                        <option value="" disabled hidden selected>Choisir un fabricant</option>
                        {allProducer.map((producer) => producer.id && !producer.attributes.deleted && <option key={producer.id} value={producer.id} selected={updateGuitar.producer.data!=null && updateGuitar.producer.data.id &&  producer.id == updateGuitar.producer.data.id}>{producer.attributes.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="nom">Nom : </label>
                    <input type="text" name="nom" id="nom" defaultValue={updateGuitar.name} onChange={(e) => setUpdateGuitar({...updateGuitar, name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="yearGuitare">Année : </label>
                    <input type="text" name="year" id="year" defaultValue={updateGuitar.year} onChange={(e) => setUpdateGuitar({...updateGuitar, year: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="deleted">Deleted : </label>
                    <input type="checkbox" name="deleted" id="deleted" defaultChecked={updateGuitar.deleted} onChange={(e) => setUpdateGuitar({...updateGuitar, deleted: !updateGuitar.deleted})}/>
                </div>
            </form>
            <a  className="classBoutton" onClick={saveData}>Sauvegarder</a>
        </div>
    );
}

export default AdminGuitarUpdate;