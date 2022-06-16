import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  }

  return (
    <div >
      <Navbar bg="primary" variant="dark">
        <Container>
        <Navbar.Brand as={Link} to="/"><img src={require("./assets/webshio.png")} alt="" /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/admin">{t('navbar.admin-button')}</Nav.Link>
          <Nav.Link as={Link} to="/poed">{t('navbar.shops-button')}</Nav.Link>
          <Nav.Link as={Link} to="/ostukorv">{t('navbar.cart-button')}</Nav.Link>
          <Nav.Link>{t("Welcome to React")}</Nav.Link>
          <img className="lang" onClick={() => changeLanguage('ee')} src={require("./assets/estonia.png")} alt="" />
          <img className="lang" onClick={() => changeLanguage('ru')} src={require("./assets/russia.png")} alt="" />
          <img className="lang" onClick={() => changeLanguage('uk')} src={require("./assets/uk.png")} alt="" />
        </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='' exact element={<div>AVALEHT</div>} />
        <Route path='admin' exact element={<div>ADMIN</div>} />
        <Route path='admin/lisa-toode' exact element={<div>LISA TOODE</div>} />
        <Route path='admin/tooted' exact element={<div>TOOTED</div>} />
        <Route path='admin/muuda-toode' exact element={<div>MUUDA TOODE</div>} />
        <Route path='poed' exact element={<div>POED</div>} />
        <Route path='ostukorv' exact element={<div>OSTUKORV</div>} />
      </Routes>
    </div>
  );
}

export default App;
