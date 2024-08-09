import { useEffect, useState } from 'react'
import './App.css'
import axios  from "axios";


function App() {

  const [amt, setAmt]=useState(1)
  const [fromCurrency, setFromCurrency]=useState("USD")
  const [toCurrency, setToCurrency]=useState("INR")
  const [convertedCurrency, setConvertedCurrency]=useState(null)
  const [exchangeRate, setExchangeRate]=useState(null)

  useEffect(()=>{
    const getExchangeRate = async ()=>{
      try{
        let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response= await axios.get(url)
        // console.log(response)
        setExchangeRate(response.data.rates[toCurrency])

      }catch(error){
        console.error("error fetching exchange rate:",error)
      }
    }
    getExchangeRate()
  },[fromCurrency,toCurrency]);

  useEffect(()=>{
    if(exchangeRate !== null){
      setConvertedCurrency((amt*exchangeRate).toFixed(2))
    }
  },[amt,exchangeRate])

  const handleAmountChange =(e)=>{
    const value =parseFloat(e.target.value)
    setAmt(isNaN(value) ? 0 : value);
  }
  
  const handleFromCurrencyChange=(e)=>{
    setFromCurrency(e.target.value)
  }

  const handleToCurrencyChange=(e)=>{
    setToCurrency(e.target.value)
  }
 
  return (
    <>
      <div className="container">
        <div className="icon"></div>
        <div className="data-container">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amount">Amount: </label>
            <input type="text" placeholder='Enter the amount' value={amt} onChange={handleAmountChange}/>
          </div>
          <div className="input-container">
            <label htmlFor="from-currency">From currency: </label>
            <select id="from-currency" value={fromCurrency} onChange={handleFromCurrencyChange}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="input-container">
          <label htmlFor="to-currency">To currency: </label>
            <select id="to-currency" value={toCurrency} onChange={handleToCurrencyChange}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p>{amt} {fromCurrency} is equal to {convertedCurrency} {toCurrency}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
