import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import LogIn from './components/LogIn';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import SalesmanDashboard from './components/SalesmanDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import Register from './components/Register';
import Profile from './components/Profile';
import Salesmans from './components/Salesmans';



function App() {

  
  const routes = [
    {path: '/', element: <Home></Home>},
    {path: '/login', element: <LogIn></LogIn>},
    {path: '/adminDashboard', element: <AdminDashboard></AdminDashboard> },
    {path: '/register', element: <Register></Register>},
    {path: '/salesmanDashboard', element: <SalesmanDashboard></SalesmanDashboard> },
    {path: '/customerDashboard', element: <CustomerDashboard></CustomerDashboard> },
    {path: '/profile', element: <Profile></Profile>},
    {path: '/salesmans', element: <Salesmans></Salesmans>}
  ]


  return (
    <div className='container'>
        <Routes>
          {
            routes.map((route) => (
              <Route path={route.path} element={route.element}></Route>
            ))
          }
        </Routes>
      </div>
  );
}

export default App;
