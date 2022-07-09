import axios from "axios";
import React, { useState } from "react";



const AdminProducerUpdate = (producer) => {
    const [updateProducer, setUpdateProducer] = useState(producer.producer.attributes);

    const saveData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:1337/api/producers/${producer.producer.id}`, {
            data: {
                name: updateProducer.name,
                deleted: updateProducer.deleted
            }
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) =>{
                console.log(response);
                window.location.href = "/admin/fabricants";
            }).catch(err =>{
                console.log(err)
            })
    }


    return (
        <div className="center adminUpdate">
            <h2 className="title">Editer</h2>
            <form className="formUpdate">
                <div>
                    <label htmlFor="nom">Nom : </label>
                    <input type="text" name="nom" id="nom" defaultValue={updateProducer.name} onChange={(e) => setUpdateProducer({...updateProducer, name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="deleted">Deleted : </label>
                    <input type="checkbox" name="deleted" id="deleted" defaultChecked={updateProducer.deleted} onChange={(e) => setUpdateProducer({...updateProducer, deleted: !updateProducer.deleted})}/>
                </div>
            </form>
            <a  className="classBoutton" onClick={saveData}>Sauvegarder</a>
        </div>
    );
}

export default AdminProducerUpdate;