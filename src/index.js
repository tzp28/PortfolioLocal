import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import NavBar from "./components/navBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from "react-router-dom";
import Login from "./components/logIn";
import SignUp from "./components/signUp";
import Portfolio from "./components/portfolio";
import Home from "./components/home";
import {Route, Routes} from "react-router-dom";
import './index.css';
import {AuthProvider} from "./components/AuthContext";
const root = ReactDOM.createRoot( document.getElementById('root'));
root.render(
    <React.StrictMode>

        <AuthProvider>
        <BrowserRouter>
               <NavBar/>
            <div className="container">
                <Routes>
                    <Route exact path ="/" element={<Home/>}/>
                    <Route path ="/home" element={<Home />}/>
                    <Route path ="/portfolio" element={<Portfolio/>}/>
                    <Route path ="/signUp" element={<SignUp/>}/>
                    <Route path ="/login" element={<Login/>}/>
                </Routes>
            </div>
        </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
