import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import LogIn from './components/LogIn';
import { Route, Routes } from 'react-router-dom';



function App() {

  
  const routes = [
    {path: '/', element: <Home></Home>}
  ]


  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;
