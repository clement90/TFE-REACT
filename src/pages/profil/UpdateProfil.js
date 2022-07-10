import axios from "axios";
import React, { useState } from "react";

const UpdateProfil = (user) => {
    const [updateUser, setUpdateUser] = useState(user.user);
    
    const saveData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:1337/api/users/${updateUser.id}`, updateUser, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(() => {
            window.location.href = "/profile";
        }
        ).catch(err => {
            console.log(err);
        }
        );
        
    }

    const deleteUser = () => {
        if(window.confirm(`Voulez-vous vraiment supprimer votre compte ? \n Attention, cette action est irréversible!!!`)){
            axios.delete(`http://localhost:1337/api/users/${updateUser.id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {
                window.location.href = "/";
                localStorage.clear();
            }
            ).catch(err => {
                console.log(err);
            }
            );
        }
    }


    return (
        <div className="center adminUpdate">
            <h2 className="title">Mettez à jour vos données</h2>
            <form action="" className="formUpdate">
                <div>
                    <label htmlFor="email">Email : </label>
                    <input type="text" name="email" id="email" defaultValue={updateUser.email} onChange={(e) => setUpdateUser({...updateUser, email: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="firstname">Prénom : </label>
                    <input type="text" name="firstname" id="firstname" defaultValue={updateUser.first_name} onChange={(e) => setUpdateUser({...updateUser, first_name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="lastname">Nom : </label>
                    <input type="text" name="lastname" id="lastname" defaultValue={updateUser.name} onChange={(e) => setUpdateUser({...updateUser, name: e.target.value})}/>
                </div>
            </form>
            <button  className="classBoutton" onClick={saveData}>Sauvegarder</button>
            <button className="classBoutton" onClick={deleteUser}>Supprimer</button>
        </div>
    );
}

export default UpdateProfil;