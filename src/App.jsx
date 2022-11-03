import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [apiData, setApiData] = useState(null);

 useEffect(()=>{
  fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo")
    .then(resp=>resp.json())
    .then(data=>{
      
   
      let temp2=Object.keys(data['Time Series (5min)'])
      let temp3=[]

     temp2.forEach((item)=>{
      temp3.push(data['Time Series (5min)'][item])
     })
     let temp4=[]
     for(let i=0;i<temp2.length;i++){

        temp4.push({date:temp2[i],open:temp3[i]['1. open'],high:temp3[i]['2. high'],low:temp3[i]['3. low'],close:temp3[i]['4. close'],volume:temp3[i]['5. volume']})
     }
setApiData(temp4)
      
    })
 },[])

console.log(apiData)
 
  return (
    <div className="App">
      <h1>Candle Sticks Data</h1>
      <table>
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {apiData && apiData.map((item,index)=>{
            return (<tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.open}</td>
                    <td>{item.high}</td>
                    <td>{item.low}</td>
                    <td>{item.close}</td>
                    <td>{item.volume}</td>
                  </tr>)
          })}
           
        </tbody>
      </table>
    </div>
  )
}

export default App
// <td>{item['1. open']}</td>
// <td>{item['2. high']}</td> 
// <td>{item['3. low']}</td>
// <td>{item['4. close']}</td>  
// <td>{item['5. volume']}</td> 