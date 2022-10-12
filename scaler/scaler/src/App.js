import logo from './logo.svg';
import React from "react"
import './App.css';
import { MainScreen } from './components/MainScreen';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [data,setData] = React.useState("TEMP")

  const handleClick = async () => {
    // setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/view_interview/', {
        method: 'GET',
        crossDomain:true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      // setErr(err.message);
    } finally {
      // setIsLoading(false);
    }

    console.log(data)
  };

  function test(){
    console.log("YO")
  }

  return (
    <div className="App">
     {/* <button onClick = {handleClick}>TEST</button> */}
     <MainScreen/>
    </div>
  );
}

export default App;
