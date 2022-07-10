import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Artists from './pages/artists/Artists';
import Numero from './pages/Numero';
import Article from './pages/Article';
import Login from './pages/Login';
import Register from './pages/Register';
import ShowArtists from './pages/artists/ShowArtist';
import Album from './pages/albums/Album';
import Guitar from './pages/guitares/Guitar';
import ShowGuitar from './pages/guitares/ShowGuitar';
import NewGuitar from './pages/guitares/NewGuitar';
import ShowAlbum from './pages/albums/ShowAlbum';
import NewAlbum from './pages/albums/NewAlbum';
import AdminUser from './pages/admin/user/AdminUser';
import AdminAlbum from './pages/admin/album/AdminAlbum';
import AdminBand from './pages/admin/band/AdminBand';
import AdminGuitar from './pages/admin/guitar/AdminGuitar';
import Profil from './pages/profil/Profil';
import AdminArtist from './pages/admin/artist/AdminArtist';
import AdminArticle from './pages/admin/article/AdminArticle';
import Band from './pages/band/Band';
import ShowBand from './pages/band/ShowBand';
import NewBand from './pages/band/NewBand';
import NewArtist from './pages/artists/NewArtist';
import AdminProducer from './pages/admin/producer/AdminProducer';





const App = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                {<Route path="/artists" element={<Artists />} />}
                {<Route path="/artists/:artistId" element={<ShowArtists />} />}
                {<Route path="/artists/new" element={<NewArtist />} />}
                {<Route path="/numero" element={<Numero />} />}
                {<Route path="/groupes" element={<Band />} />}
                {<Route path="/groupes/:bandId" element={<ShowBand />} />}
                {<Route path="/groupes/new" element={<NewBand />} />}
                {<Route path="/albums" element={<Album />} />}
                {<Route path="/albums/new" element={<NewAlbum />} />}
                {<Route path="/albums/:albumId" element={<ShowAlbum />} />}
                {<Route path="/guitares" element={<Guitar />} />}
                {<Route path="/guitares/:guitarId" element={<ShowGuitar />} />}
                {<Route path="/guitares/new" element={<NewGuitar />} />}
                {<Route path="/articles" element={<Article />} />}
                {<Route path="/login" element={<Login />} />}
                {<Route path="/inscription" element={<Register />} />}
                {<Route path="/admin/albums" element={<AdminAlbum/>}/>}
                {<Route path="/admin/artistes" element={<AdminArtist/>}/>}
                {<Route path="/admin/groupes" element={<AdminBand/>}/>}
                {<Route path="/admin/guitares" element={<AdminGuitar/>}/>}
                {<Route path="/admin/fabricants" element={<AdminProducer/>}/>}
                {<Route path="/admin/numeros" element={<AdminUser/>}/>}
                {<Route path="/admin/articles" element={<AdminArticle/>}/>}
                {<Route path="/admin/users" element={<AdminUser/>}/>}
                {<Route path="/profile" element={<Profil/>}/>}
                {<Route path="*" element={<Home />} />}
            </Routes>
        </BrowserRouter>
    );
};

export default App; 