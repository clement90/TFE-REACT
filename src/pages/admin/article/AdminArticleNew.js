import axios from "axios";
import React, { useState } from "react";

const AdminArticleNew = () => {
    const [article, setArticle] = useState();
    const saveData = () => {
        axios.post(`http://localhost:1337/api/articles`, {
            data :{
                title: article.title,
                article: article.article,
                deleted: article.deleted,
                author: localStorage.getItem("id")

            }
        },{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((reponse) => {
            console.log(reponse);
            window.location.href = "/admin/articles";
        }
        ).catch(err => {
            console.log(err);
        }
        );
    }
    
    return (
        <div className="center adminUpdate">
            <h2 className="title">Ajouter</h2>
            <form className="formUpdate">
                <div>
                    <label htmlFor="nom">Titre : </label>
                    <input type="text" name="nom" id="nom"  onChange={(e) => setArticle({...article, title: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="nom">Contenu : </label>
                    <textarea name="nom" id="nom"  cols="60" rows="25" onChange={(e) => setArticle({...article, article: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="deleted">Deleted : </label>
                    <input type="checkbox" name="deleted" id="deleted"  onChange={(e) => setArticle({...article, deleted: !article.deleted})}/>
                </div>
            </form>
            <a  className="classBoutton" onClick={saveData}>Sauvegarder</a>
        </div>
    );
}

export default AdminArticleNew;