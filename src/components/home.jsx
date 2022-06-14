import React, {Component} from "react";
//import {db} from '../firebase'
//import {collection, getDocs} from 'firebase/firestore'
//import {useAuth} from './AuthContext';
import AddPort from "./addPort";




class Home extends Component{



    state = {
        loading: false,
        stockName: "Apple Inc",
        stockPrice: '146.18',
        stockLogo: 'https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png',
        stockPct:"2.4",
        stockTicker: "AAPL",
        stockIndustry: "",
    }


    handleSubmit = (event) => {
        event.preventDefault()

        //console.log(event.target[0].value);
        //console.log(this.inputNode.value)
        const sym = event.target[0].value;
        console.log(sym)
        const key = process.env.REACT_APP_API_KEY;
        fetch(`https://finnhub.io/api/v1/quote?symbol=${sym}&token=${key}`)
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                if(response.c != null) {
                    this.setState({stockPrice: response.c,stockPct: response.dp});
                }
                else{
                    alert("Invalid Ticker, Please Try Again")
                }
    })
        fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${sym}&token=${key}`)
            .then(response => response.json())
            .then((response) => {
                if(response.name != null) {
                    this.setState({stockName: response.name, stockLogo: response.logo, stockTicker: response.ticker, stockIndustry: response.finnhubIndustry});
                }
                else{
                    alert("Invalid Ticker, Please Try Again")
                }
            })

    }




    render () {


        function aP(stockName, stockPrice, stockLogo, stockPct, stockTicker, stockIndustry, clicked){
            AddPort(stockName, stockPrice, stockLogo, stockPct, stockTicker, stockIndustry, clicked);

        }
        React.createElement('h1')
        let inputStyle = {
            color: 'black'
        };
        //console.log(this.state.input);
        if(this.state.stockPct >= 0) {
            inputStyle = {
                color:'green'
            }
        }
        else{
            inputStyle = {
                color:'red'
            }
        }


        return (
            <div className ="centered">
                <h1>{this.state.stockName} <div>{this.state.stockTicker}</div></h1>
                <img className="logoImg" src={this.state.stockLogo} />
                <h2 id ="sPr">${Math.round(this.state.stockPrice*100)/100}</h2>
                <h2 style ={inputStyle}>
                    {Math.round(this.state.stockPct*100)/100}%

                </h2>
                <form onSubmit={this.handleSubmit}>
                    <label >
                        Enter Stock Symbol:
                        <input ref = {node => (this.inputNode = node)} placeholder="Stock Symbol" className = "inputBox"  type="text"  name = "symbol" id="sym"/>
                    </label>
                    <input className="subButton" type="submit" value="ENTER" />
                </form>
                <br></br>
                <button className="portButton" type = "submit" onClick={() => aP(this.state.stockName, this.state.stockPrice, this.state.stockLogo,
                    this.state.stockPct, this.state.stockTicker, this.state.stockIndustry,true)}>ADD TO PORTFOLIO</button>
            </div>
        )
    }
}

export default Home;
