import React from "react";
import { Link } from "react-router-dom";

const GuitarArtist = ({ guitare }) => {
    return (
        <div>
            <h3>Les guitares : </h3>
            <br />
            {guitare && guitare.data!=0? guitare.data.map((guitare) =>(
            <li className='listShowArtist' key={guitare.id}>
                <Link to={`/guitares/${guitare.id}`} className="artistGuitar">
                    {guitare.attributes.producer.data.attributes.name} {guitare.attributes.name} {guitare.attributes.year}
                </Link>
            </li>)) 
            : "Pas de guitare associée"}
        </div>
    );
}

export default GuitarArtist;
