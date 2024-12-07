import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';
import fetchs from './fetchs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Categorias from './components/Categoria';
import Videojuegos from './components/Videojuego';
import UsuariosEstandar from './components/UsuarioEstandar';
import UsuarioPremium from './components/UsuarioPremium';
import Venta from './components/Venta';
import FiltrarVideojuegos from './components/FiltrarVideoJuegos';
import ListarUsuarios from './components/ListarUsuarios';
import FiltrarVentasPorUsuario from './components/FiltrarVentasPorUsuario';
import ListarVentasPorFecha from './components/ListarVentasPorFecha';

function App() {
  const [showCategoriasMenu, setShowCategoriasMenu] = useState(false);
  const [showVideojuegosMenu, setShowVideojuegosMenu] = useState(false);
  const [showUsuariosMenu, setShowUsuariosMenu] = useState(false);
  const [showUsuariosPremiumMenu, setShowUsuariosPremiumMenu] = useState(false);
  const [showVentasMenu, setShowVentasMenu] = useState(false);
  const [showFiltro1Menu, setShowFiltro1Menu] = useState(false);
  const [showFiltro2Menu, setShowFiltro2Menu] = useState(false);
  const [showFiltro3Menu, setShowFiltro3Menu] = useState(false);
  const [showFiltro4Menu, setShowFiltro4Menu] = useState(false);


  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaVideojuegos, setListaVideojuegos] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaUsuariosPremium, setListaUsuariosPremium] = useState([]);


  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {

    fetchs.listCategorias(setListaCategorias);
    fetchs.listVideojuegos(setListaVideojuegos);
    fetchs.listUsuariosEstandar(setListaUsuarios);
    fetchs.listUsuariosPremium(setListaUsuariosPremium);

  }, []);  

  const handleShowCategoriasMenu = () => {
    setShowCategoriasMenu(true);
    setShowVideojuegosMenu(false);
    setShowUsuariosMenu(false);
    setShowUsuariosPremiumMenu(false);
    setShowVentasMenu(false);
    setShowFiltro3Menu(false);
    setShowFiltro2Menu(false);
    setShowFiltro1Menu(false);
    setShowFiltro4Menu(false);
  };
  const handleShowFiltrosMenu = () => {
    setShowFiltro4Menu(true);
    setShowFiltro3Menu(true);
    setShowFiltro2Menu(true);
    setShowFiltro1Menu(true);
    setShowCategoriasMenu(false);
    setShowVideojuegosMenu(false);
    setShowUsuariosMenu(false);
    setShowUsuariosPremiumMenu(false);
    setShowVentasMenu(false);
  };

  const handleShowVideojuegosMenu = () => {
    setShowCategoriasMenu(false);
    setShowVideojuegosMenu(true);
    setShowUsuariosMenu(false);
    setShowUsuariosPremiumMenu(false);
    setShowVentasMenu(false);
    setShowFiltro3Menu(false);
    setShowFiltro2Menu(false);
    setShowFiltro1Menu(false);
    setShowFiltro4Menu(false);
  };

  const handleShowUsuariosMenu = () => {
    setShowCategoriasMenu(false);
    setShowVideojuegosMenu(false);
    setShowUsuariosMenu(true);
    setShowUsuariosPremiumMenu(false);
    setShowVentasMenu(false);
    setShowFiltro3Menu(false);
    setShowFiltro2Menu(false);
    setShowFiltro1Menu(false);
    setShowFiltro4Menu(false);
  };

  const handleShowVentasMenu = () => {
    setShowCategoriasMenu(false);
    setShowVideojuegosMenu(false);
    setShowUsuariosMenu(false);
    setShowVentasMenu(true);
    setShowFiltro3Menu(false);
    setShowFiltro2Menu(false);
    setShowFiltro1Menu(false);
    setShowUsuariosPremiumMenu(false);
    setShowFiltro4Menu(false);
  };

  const handleShowUsuariosPremiumMenu = () => {
    setShowCategoriasMenu(false);
    setShowVideojuegosMenu(false);
    setShowUsuariosMenu(false);
    setShowUsuariosPremiumMenu(true);
    setShowVentasMenu(false);
    setShowFiltro3Menu(false);
    setShowFiltro2Menu(false);
    setShowFiltro1Menu(false);
    setShowFiltro4Menu(false);
  };

  return (
    <div className="App">
      <Navbar bg="primary" data-bs-theme="dark" expand="sm">
        <Container>
          <Navbar.Brand href="#home">Gestión de Datos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={handleShowCategoriasMenu}>Categorías</Nav.Link>
            <Nav.Link onClick={handleShowVideojuegosMenu}>Videojuegos</Nav.Link>
            <Nav.Link onClick={handleShowUsuariosMenu}>Usuarios Estándar</Nav.Link>
            <Nav.Link onClick={handleShowUsuariosPremiumMenu}>Usuarios Premium</Nav.Link>
            <Nav.Link onClick={handleShowVentasMenu}>Ventas</Nav.Link>
            <Nav.Link onClick={handleShowFiltrosMenu}>Filtros</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {success !== null && (
        <Alert
          variant={success ? "success" : "danger"}
          style={{ width: "30%", margin: 'auto', marginTop: '2.5%', textAlign: "center" }}
        >
          {msg}
        </Alert>
      )}

      {showFiltro1Menu && <FiltrarVideojuegos/>}
      {showFiltro2Menu && <ListarUsuarios/>}
      {showFiltro3Menu && <FiltrarVentasPorUsuario/>}
      {showFiltro4Menu && <ListarVentasPorFecha/>}
      {showCategoriasMenu && <Categorias listaCategorias={listaCategorias} />}
      {showVideojuegosMenu && <Videojuegos listaCategorias={listaCategorias} listaVideojuegos={listaVideojuegos} />}
      {showUsuariosMenu && <UsuariosEstandar listaUsuarios={listaUsuarios} />}
      {showUsuariosPremiumMenu && <UsuarioPremium listaUsuariosPremium={listaUsuariosPremium} />}
      {showVentasMenu && <Venta listaVideojuegos={listaVideojuegos} listaUsuarios={listaUsuarios} />}
    </div>
  );
}

export default App;
