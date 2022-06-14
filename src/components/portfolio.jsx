import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import {addDoc, collection, getDocs, updateDoc, deleteDoc, doc} from 'firebase/firestore'
import {useAuth} from './AuthContext';
import firebase from "firebase/compat/app"





export default function Portfolio() {
    const [portStocks, setPortStocks] = useState([]);
    const portStocksCollectionRef = collection(db, "portStocks");
    const {currentUser} = useAuth();
    const decrease = async (id, nStocks) => {
        if(nStocks - 1 >= 1) {
            const portDoc = doc(db, "portStocks", id);
            const newFields = {numStocks: Number(nStocks) - 1}
            await updateDoc(portDoc, newFields);
            window.location.reload();
        }
        else{
            await sellOff(id);

        }
    };

    const increase = async (id, nStocks) => {
        console.log("run");
        nStocks =  Number(nStocks) + 1;
        const portDoc = doc(db, "portStocks", id);
        const newFields = {numStocks: nStocks }
        await updateDoc(portDoc, newFields);
        window.location.reload();
    };

    const sellOff = async(id) =>{
        const portDoc = doc(db, "portStocks", id);
        await deleteDoc(portDoc);
        window.location.reload();
    }

    useEffect (() =>{

        const getPortStocks = async () => {
            const data = await getDocs(portStocksCollectionRef);
            setPortStocks(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
            //console.log(data);
        }
        getPortStocks();
    }, [])



    let total = 0;
    let totals = [];


        portStocks.map((portStock) => {
            if (portStock.stockOwner === currentUser.email) {
                totals.push(((Math.round((portStock.sPrice * portStock.numStocks) * 100) / 100)))
                //console.log(totals)
            }
        })

        for(let i = 0; i<totals.length;i++){
            total += totals[i];
        }
    return <body><div className="total">Total Invested
        <h1>${total.toFixed(2)}</h1>

    </div>
    <table className="uStock">
        <tr>
            <th>Company Logo</th>
            <th>Company</th>
            <th>Stock Ticker</th>
            <th>Industry</th>
            <th>Amount Invested</th>
            <th># of Shares</th>
            <th>Sell All Shares</th>

        </tr>
        {portStocks.map((portStock)=>{
            if(portStock.stockOwner === currentUser.email) {

                return <tr>
                    <td><img className="tblImg" src={portStock.sLogo}></img></td>
                    <td>{portStock.sName + ' '}</td>
                    <td>{portStock.sTicker + ' '}</td>
                    <td>{portStock.sIndustry + ' '}</td>
                    <td>${(portStock.sPrice * portStock.numStocks).toFixed(2)}</td>
                    <td><button className="counterL" onClick={() => decrease(portStock.id,portStock.numStocks)}>-</button>{portStock.numStocks}
                    <button className="counterR" onClick={() => increase(portStock.id,portStock.numStocks)}>+</button></td>
                    <td><button  onClick={() =>sellOff(portStock.id)}>Sell All</button></td>

                </tr>;
            }
        })}

    </table>
    </body>
}
