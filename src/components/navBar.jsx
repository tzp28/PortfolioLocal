import React, {useState} from "react";
import {logOut} from '../firebase'
import {useAuth} from './AuthContext';

import {Link, useNavigate} from "react-router-dom";

export default function NavBar(){




    const [error, setError] = useState('')
    const {currentUser, logOut} = useAuth();
    const navigate = useNavigate();


    async function handleLogout(e){
        e.preventDefault()
        setError('')
        try{
            console.log(currentUser.email);
            await logOut();
            navigate("/");


        }

        catch {
            setError('Failed to log out')
        }

    }




    if(currentUser == null) {
        return <body>
        <header>
            <img class="stockLogo" src="port.png" alt="sl"/>
            <nav className="navy">
                <ul class="links">
                    <li><Link to="/home">Home</Link></li>


                </ul>

            </nav>


            <div>
                <Link className="signIn" to="/logIn">
                    <button className="signButton">LOG IN</button>
                </Link>
                <Link className="sign" to="/signUp">
                    <button>SIGN UP</button>
                </Link>


            </div>
        </header>
        </body>


    }

    else{
        return <body >
        <header>
            <img className="stockLogo" src="port.png" alt="sl"/>
            <nav className="navy">
                <ul className="links2">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/portfolio">Portfolio</Link></li>
                </ul>

            </nav>


            <div>
                <li className ="as">Signed in as: {currentUser.email}</li>
                <button onClick={handleLogout}>LOG OUT</button>

            </div>
        </header>
        </body>
    }



}


