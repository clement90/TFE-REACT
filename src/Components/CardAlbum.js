import React from "react";

const CardAlbum = ({ album }) => {
    
    const song = album.songs;
    console.log(song);
    /* song = song.split("\n"); */
    console.log(song);

    return (
        <div className="album">
        {/* <p>{song.map((song,index) =><li key={index}>{song}</li>)}</p> */}
        </div>
    );
    };

    export default CardAlbum;

