import axios from "axios";
import React, { useState } from "react";


const AdminUserUpdate = (user) => {
    const [updateUser, setUpdateUser] = useState(user.user);
    
    const saveData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:1337/api/users/${updateUser.id}`, updateUser, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(() => {
            window.location.href = "/admin/users";
        }
        ).catch(err => {
            console.log(err);
        }
        );
    }
    return (
        <div className="center adminUpdate">
            <h2 className="title">Editer</h2>
            <form action="" className="formUpdate">
                <div>
                    <label htmlFor="username">Nom d'utilisateur : </label>
                    <input type="text" name="username" id="username" defaultValue={updateUser.username} onChange={(e) => setUpdateUser({...updateUser, username: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="email">Email : </label>
                    <input type="text" name="email" id="email" defaultValue={updateUser.email} onChange={(e) => setUpdateUser({...updateUser, email: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="firstname">Prénom : </label>
                    <input type="text" name="firstname" id="firstname" defaultValue={updateUser.first_name} onChange={(e) => setUpdateUser({...updateUser, firstname: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="lastname">Nom : </label>
                    <input type="text" name="lastname" id="lastname" defaultValue={updateUser.name} onChange={(e) => setUpdateUser({...updateUser, name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="role">Administrateur : </label>
                    <input type="checkbox" name="role" id="role" defaultChecked={updateUser.admin} onChange={(e) => setUpdateUser({...updateUser, admin: !updateUser.admin})}/>
                </div>
                <div>
                    <label htmlFor="role">Bloqué : </label>
                    <input type="checkbox" name="bloque" id="bloque" defaultChecked={updateUser.blocked} onChange={(e) => setUpdateUser({...updateUser, blocked: !updateUser.blocked})}/>
                </div>
            </form>
            <a  className="classBoutton" onClick={saveData}>Sauvegarder</a>
             
            
        </div>
    );
}

export default AdminUserUpdate;