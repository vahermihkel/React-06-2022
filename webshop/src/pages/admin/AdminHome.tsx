import { Link } from 'react-router-dom';

// ühendamata App.jsx-i
function AdminHome() {
  return ( 
  <div>
    <Link to="/admin/lisa-toode">
      <button>Toodet lisama</button>
    </Link>
    <Link to="/admin/kategooriad">
      <button>Halda kategooriaid</button>
    </Link>
    <Link to="/admin/tooted">
      <button>Halda tooteid</button>
    </Link>
  </div> );
}

export default AdminHome;