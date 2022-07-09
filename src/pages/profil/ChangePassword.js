import axios from "axios";
import React, { useState } from "react";

const ChangePassword = (user) => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const saveData = (e) => {
        e.preventDefault();
        
        if (password.length < 6) {
            alert("Le mot de passe doit contenir au moins 6 caractères");
            
        } else{
            if (password === passwordConfirm) {
                alert("Votre mot de passe a bien été modifié");
            axios.put(`http://localhost:1337/api/users/${user.user.id}`,{
                    password: password
                }, {
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
            } else {
                alert("Les mots de passe ne correspondent pas");
            }
        }
    }

    return (
        <div className="center adminUpdate">
            <h2 className="title">Changement de mot de passe</h2>
            <form action="" className="formUpdate">
                <div>
                    <label htmlFor="newPassword">Nouveau mot de passe : </label>
                    <input type="password" name="newPassword" id="newPassword" placeholder="(minimum 6 charactères)" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmedPassword">Confirmation du mot de passe : </label>
                    <input type="password" name="confirmedPassword" id="confirmedPassword" placeholder="(minimum 6 charactères)" onChange={(e) => setPasswordConfirm(e.target.value)}/>
                </div>
            </form>
            <a  className="classBoutton" onClick={saveData}>Sauvegarder</a>
             
            
        </div>
    );
}



export default ChangePassword;