import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import Cart from './pages/Cart';
import HomePage from './pages/HomePage';
import PaymentCompleted from './pages/PaymentCompleted';

function App() {
  return (
    <div>
      <Link to="/">
        <button>Avalehele</button>
      </Link>
      <Link to="/ostukorv">
        <button>Ostukorvi</button>
      </Link>
      <Routes>
        <Route path="" exact element={ <HomePage /> } />
        <Route path="ostukorv" exact element={ <Cart /> } />
        <Route path="tellimus" exact element={ <PaymentCompleted /> } />
      </Routes>
    </div>
  );

  // uus tellimus fetch kaudu Wordpress
}

export default App;
