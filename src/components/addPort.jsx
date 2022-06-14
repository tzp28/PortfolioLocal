import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import {collection, getDocs, addDoc} from 'firebase/firestore'
import {useAuth} from './AuthContext';
import firebase from "firebase/compat/app"
import { getDatabase, ref, set } from "firebase/database";


export default function AddPort(stockName, stockPrice, stockLogo, stockPct, stockTicker, stockIndustry, clicked) {
        //console.log(clicked);

        let nStocks = prompt("Enter # Shares of " + stockTicker + " to Add to Portfolio");
        if(nStocks == null){
            nStocks = 0;
        }
        //const {currentUser} = useAuth();
        //const [portStocks, setPortStocks] = useState([]);
        const colRef = collection(db, 'portStocks');



        firebase.auth().onAuthStateChanged((user) => {

                if (user) {
                    console.log(user.email);
                    if(user.email != null) {
                    if (clicked) {
                        console.log(clicked, user.email);

                        addDoc(colRef, {
                            stockOwner: user.email,
                            numStocks: nStocks,
                            sLogo: stockLogo,
                            sName: stockName,
                            sPct: stockPct,
                            sPrice: stockPrice,
                            sTicker: stockTicker,
                            sIndustry: stockIndustry,

                        })
                        clicked = false;
                    }

                }
                    else{
                        alert("Please log in or sign up to add to a personal portfolio");
                    }


            }


        });


        //console.log(nStocks, stockName, stockPrice, stockLogo, stockPct, stockTicker, stockIndustry)
        //console.log(clicked);




}
