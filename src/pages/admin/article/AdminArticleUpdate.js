import axios from "axios";
import React, { useState } from "react";



const AdminArticleUpdate = (article) => {
    const [articleSelected, setArticleSelected] = useState(article.article.attributes);
    console.log(articleSelected);

    const saveData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:1337/api/articles/${article.article.id}`, {
            data :{
                title: articleSelected.title,
                article: articleSelected.article,
                deleted: articleSelected.deleted,
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
            <h2 className="title">Editer</h2>
            <form className="formUpdate">
                <div>
                    <label htmlFor="nom">Titre : </label>
                    <input type="text" name="nom" id="nom" defaultValue={articleSelected.title} onChange={(e) => setArticleSelected({...articleSelected, title: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="nom">Contenu : </label>
                    <textarea name="nom" id="nom" defaultValue={articleSelected.article} cols="60" rows="25" onChange={(e) => setArticleSelected({...articleSelected, article: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="deleted">Deleted : </label>
                    <input type="checkbox" name="deleted" id="deleted" defaultChecked={articleSelected.deleted} onChange={(e) => setArticleSelected({...articleSelected, deleted: !articleSelected.deleted})}/>
                </div>
            </form>
            <a  className="classBoutton" onClick={saveData}>Sauvegarder</a>
        </div>
    );
}

export default AdminArticleUpdate;