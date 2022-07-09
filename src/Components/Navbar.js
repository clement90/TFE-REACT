import React from "react";
import { NavLink } from "react-router-dom";

//Barre de navigation

const Navbar = () =>{

    /* Dropdown */
    /* function myFunction(e) {
        document.getElementById("myDropdown").classList.toggle("show");
        if (!e.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

    function myFunction2(e) {
        document.getElementById("myDropdown2").classList.toggle("show");
        if (!e.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
            }
        }
    }    */   
      
      // Close the dropdown if the user clicks outside of it
      

      /* logoff */
    const logoff = () => {
        localStorage.removeItem("token");
        localStorage.removeItem('admin');
        window.location.reload();
        window.location('/')
        
    }
    return(
    <div>
        <nav>
        <ul className="navigation">
            <NavLink to="/" className={(nav) => (nav.isActive ? "selected" :"notselected")}>
            <li>Home</li></NavLink>
            <NavLink to="/artists" className={(nav) => (nav.isActive ? "selected" :"notselected")}>
            <li>Artistes</li></NavLink>
            <NavLink to="/groupes" className={(nav) => (nav.isActive ? "selected" :"notselected")}>
            <li>Groupes</li></NavLink>
            <NavLink to="/albums" className={(nav) => (nav.isActive ? "selected" :"notselected")}>
            <li>Albums</li></NavLink>
            <NavLink to="/guitares" className={(nav) => (nav.isActive ? "selected" :"notselected")}>
            <li>Guitares</li></NavLink>
            <NavLink to="/numero" className={(nav) => (nav.isActive ? "selected" :"notselected")}>
            <li>Numéro de série</li></NavLink>
            <NavLink to="/articles" className={(nav) => (nav.isActive ? "selected" :"notselected")}>
            <li>Articles</li></NavLink>  
        </ul>
        
            {!localStorage.getItem('token')? <ul className="navigation">
                <NavLink to="/inscription" className={(nav) => (nav.isActive ? "selected" :"notselected")}>
            <li>S'inscrire</li></NavLink>
            <NavLink to="/login" className={(nav) => (nav.isActive ? "selected" :"notselected")}>
            <li>Se connecter</li></NavLink></ul>
             : 
             <ul className="navigation">
                {JSON.parse(localStorage.getItem('admin'))===true && 
                    <div className="dropdown" >
                        <button className="dropbtn" /* onClick={(e)=>myFunction(e)} */>Administration
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content left" id="myDropdown">
                            <NavLink to="/admin/albums" className={(nav) => (nav.isActive ? "selected" :"notselected")}>Albums</NavLink>
                            <NavLink to="/admin/artistes" className={(nav) => (nav.isActive ? "selected" :"notselected")}>Artistes</NavLink>
                            <NavLink to="/admin/groupes" className={(nav) => (nav.isActive ? "selected" :"notselected")}>Groupes</NavLink>
                            <NavLink to="/admin/guitares" className={(nav) => (nav.isActive ? "selected" :"notselected")}>Guitares</NavLink>
                            <NavLink to="/admin/fabricants" className={(nav) => (nav.isActive ? "selected" :"notselected")}>Fabricants</NavLink>
                            <NavLink to="/admin/numéro" className={(nav) => (nav.isActive ? "selected" :"notselected")}>Numéros de série</NavLink>
                            <NavLink to="/admin/articles" className={(nav) => (nav.isActive ? "selected" :"notselected")}>Articles</NavLink>
                            <NavLink to="/admin/users" className={(nav) => (nav.isActive ? "selected" :"notselected")}>Utilisateurs</NavLink>
                        </div>
                    </div>
                }
                <div className="dropdown">
                    <button className="dropbtn" /* onClick={(e)=>myFunction2(e)} */>Utilisateur
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content" id="myDropdown2">
                    <NavLink to="/profile" className={(nav) => (nav.isActive ? "selected" :"notselected")}>Profile</NavLink>
                        <NavLink to="/" className="notselected" onClick={logoff}>
                Déconnexion</NavLink>
                    </div>
                    </div>
                
             </ul>}
            
        </nav>
        <hr />
    </div>)
}

export default Navbar;