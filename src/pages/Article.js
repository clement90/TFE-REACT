import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';


const Article =() =>{
    const [article, setArticle] = useState([]);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() =>{
        axios.get(`http://localhost:1337/api/articles?sort=createdAt:desc&populate=author`)
        .then((reponse) =>{
            setArticle(reponse.data.data);
        }).catch(err =>{
            console.log(err)
        }
        )
    },[]);

    return ( 
    <div className='App'>
        <Navbar></Navbar>
        <h1 className='title'>Articles</h1>
        {article.map((article, index) =>( ! article.attributes.deleted &&
        <div className='article' key={index}>
                <h2>{article.attributes.title}</h2>
                {article.attributes.article && article.attributes.article.split("\n").map((para, index) =>  <p key={index}>{para}</p>)}
                {/* {article.attributes.author.data && <p className="author">Auteur·rice : {article.attributes.author.data.map((author) => <span key={author} >{author.attributes.username} </span>)}</p>}  */}
                {article.attributes.author.data && <p className="author">Auteur·rice : {article.attributes.author.data.attributes.username} </p>}               
        </div>)
        )
    }
    <Footer></Footer>
</div>
);
};

export default Article;