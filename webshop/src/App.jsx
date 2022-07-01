import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import AddProduct from './pages/admin/AddProduct';
import AdminHome from './pages/admin/AdminHome';
import Category from './pages/admin/Category';
import Shops from './pages/Shops';
import NavigationBar from './components/NavigationBar';
import MaintainProducts from './pages/admin/MaintainProducts';

function App() {
  return (
    <div >
      <NavigationBar />
      <Routes>
        <Route path='' exact element={ <Home /> } />
        <Route path='admin' exact element={ <AdminHome /> } />
        <Route path='admin/lisa-toode' exact element={ <AddProduct />} />
        <Route path='admin/tooted' exact element={ <MaintainProducts /> } />
        <Route path='admin/kategooriad' exact element={ <Category /> } />
        <Route path='admin/muuda-toode' exact element={<div>MUUDA TOODE</div>} />
        <Route path='poed' exact element={ <Shops /> } />
        <Route path='ostukorv' exact element={ <Cart /> } />
      </Routes>
    </div>
  );
}

export default App;
