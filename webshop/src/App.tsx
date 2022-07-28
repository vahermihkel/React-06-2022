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
import EditProduct from './pages/admin/EditProduct';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import SingleProduct from './pages/SingleProduct';

function App() {
  return (
    <div >
      <NavigationBar />
      <Routes>
        <Route path='' element={ <Home /> } />
        <Route path='admin' element={ <AdminHome /> } />
        <Route path='admin/lisa-toode' element={ <AddProduct />} />
        <Route path='admin/tooted' element={ <MaintainProducts /> } />
        <Route path='admin/kategooriad' element={ <Category /> } />
        <Route path='admin/muuda/:id' element={ <EditProduct /> } />
        <Route path='poed' element={ <Shops /> } />
        <Route path='ostukorv' element={ <Cart /> } />
        <Route path='meist' element={ <AboutUs /> } />
        <Route path='toode/:id' element={ <SingleProduct /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;
