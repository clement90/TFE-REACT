import React from "react";
import { useMatch, Link, Route } from 'react-router-dom';
import ShowArtist from "../pages/artists/ShowArtist";



const Card = ({artist}) => {    
    
    return (
        <div className="artist">
            <Link to={`/artists/${artist.id}`}>
                {artist.attributes.first_name} {artist.attributes.name}
              </Link>
            <br></br>
            <br />
           {artist.attributes.band_id.data[0]? <p className="showArtistGroup"><Link to={`/groupes/${artist.attributes.band_id.data[0].id}`}>{artist.attributes.band_id.data[0].attributes.name}</Link></p> : <p>-</p>}
           <br /><br /> 
        </div>
    );
};

export default Card;