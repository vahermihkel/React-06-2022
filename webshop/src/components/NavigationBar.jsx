import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NavigationBar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  }

  return ( 
  <Navbar bg="primary" variant="dark">
    <Container>
    <Navbar.Brand as={Link} to="/"><img src={require("../assets/webshio.png")} alt="" /></Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/admin">{t('navbar.admin-button')}</Nav.Link>
      <Nav.Link as={Link} to="/poed">{t('navbar.shops-button')}</Nav.Link>
      <Nav.Link as={Link} to="/ostukorv">{t('navbar.cart-button')}</Nav.Link>
      <Nav.Link as={Link} to="/meist">Meist</Nav.Link>
      <img className="lang" onClick={() => changeLanguage('ee')} src={require("../assets/estonia.png")} alt="" />
      <img className="lang" onClick={() => changeLanguage('ru')} src={require("../assets/russia.png")} alt="" />
      <img className="lang" onClick={() => changeLanguage('uk')} src={require("../assets/uk.png")} alt="" />
    </Nav>
    </Container>
  </Navbar> );
}

export default NavigationBar;