import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";


const AdminBandUpdate = (band) => {
    const [updateBand, setUpdateBand] = useState(band.band.attributes);

    const saveData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:1337/api/bands/${band.band.id}`, {
            data: {
                name: updateBand.name,
                deleted: updateBand.deleted
            }
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) =>{
                console.log(response);
                window.location.href = "/admin/groupes";
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
                    <input type="text" name="nom" id="nom" defaultValue={updateBand.name} onChange={(e) => setUpdateBand({...updateBand, name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="deleted">Deleted : </label>
                    <input type="checkbox" name="deleted" id="deleted" defaultChecked={updateBand.deleted} onChange={(e) => setUpdateBand({...updateBand, deleted: !updateBand.deleted})}/>
                </div>
            </form>
            <a  className="classBoutton" onClick={saveData}>Sauvegarder</a>
        </div>
    );
}

export default AdminBandUpdate;