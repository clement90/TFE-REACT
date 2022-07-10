import axios from "axios";
import React, { useState } from "react";
import Footer from "../../../Components/Footer";
import Navbar from "../../../Components/Navbar";

const AdminProducerNew = () => {
    const [producer, setProducer] = useState();

    const saveData = () => {
        axios.post(`http://localhost:1337/api/producers`, {
            data: {
                name: producer.name
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
        <div className="center adminUpdate">
            <h2 className="title">Ajouter un fabricant</h2>
            <form action="" className="updateGuitare">
                <div>
                    <label htmlFor="name">Nom du fabricant :</label>
                    <input type="text" name="name" id="name" onChange={(e) => setProducer({...producer, name: e.target.value})}/>
                </div>
            </form>
            <a href={`/admin/fabricants`} className="classBoutton" onClick={saveData}>Sauvegarder</a>
        </div>
    );
    }
export default AdminProducerNew;