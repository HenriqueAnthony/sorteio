import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from './index';
import Sorteio from './sorteio';

function App(){

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />        
        <Route path="/sorteio/" element={<Sorteio/>} /> 
               
      </Routes>
    </Router>

  );
}


export default App;
