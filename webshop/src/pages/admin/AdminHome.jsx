import { Link } from 'react-router-dom';

// ühendamata App.jsx-i
function AdminHome() {
  return ( 
  <div>
    <Link to="/admin/lisa-toode">
      <button>Toodet lisama</button>
    </Link>
  </div> );
}

export default AdminHome;