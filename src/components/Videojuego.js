import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

import { useState, useEffect } from 'react';

import fetchs from '../fetchs';

import 'bootstrap/dist/css/bootstrap.min.css';

const Videojuegos = (props) => {
    const [listaVideojuegos, setListaVideojuegos] = useState(props.listaVideojuegos);
    const [listaCategorias, setListaCategorias] = useState(props.listaCategorias);
    const [videojuego, setVideojuego] = useState(null);
    const [msg, setMsg] = useState(null);
    const [success, setSuccess] = useState(null);

    const[id,setId]= useState(null);
    const [nombre, setNombre] = useState(null);
    const [descripcion, setDescripcion] = useState(null);
    const [precio, setPrecio] = useState(null);
    const [cantCopias, setCantCopias] = useState(null);
    
    const [categoriaId, setCategoriaId] = useState(null);

    useEffect(() => {
        fetchs.listVideojuegos(setListaVideojuegos);
      }, []);

    const fillForm = (id) => {
        fetchs.getVideojuego(id)
            .then(data => {
                setId(data.id)
                setVideojuego(data);
                setNombre(data.nombre);
                setDescripcion(data.descripcion);
                setPrecio(data.precio);
                setCantCopias(data.cantCopias);
                setCategoriaId(data.categoria?.id || null);
            })
            .catch(error => {
                console.error('Error al obtener el videojuego:', error);
            });
    };
    return (
        <div className='Videojuegos' style={{ marginTop: "5%" }}>
             <Container>
                <Row>
                    <Col>
                     
                        <Form>
                        <Form.Group className="mb-3">
                                <Form.Label>Id</Form.Label>
                                <Form.Control 
                                    value={id} 
                                    onChange={(e) => setId(e.target.value)} 
                                    type="number" 
                                    placeholder="Id" 
                                    disabled
                                    

                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    value={nombre || ''}
                                    onChange={(e) => setNombre(e.target.value)}
                                    type="text"
                                    placeholder="Nombre del videojuego"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    value={descripcion || ''}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    as="textarea"
                                    rows={3}
                                    placeholder="Descripción del videojuego"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    value={precio || ''}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    type="number"
                                    placeholder="Precio del videojuego"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cantidad de Copias</Form.Label>
                                <Form.Control
                                    value={cantCopias || ''}
                                    onChange={(e) => setCantCopias(e.target.value)}
                                    type="number"
                                    placeholder="Cantidad de copias disponibles"
                                />
                                 
                            
                            </Form.Group>
                            <Form.Select
                                value={categoriaId || ""}
                                aria-label="Categoría"
                                onChange={(e) => setCategoriaId(e.target.value)}
                            >
                                <option value="" disabled>Seleccione una categoría</option>
                                {listaCategorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.id + ", " + categoria.nombre}
                                    </option>
                                ))}
                                
                            </Form.Select>
                            {msg && (
                            <div style={{ color: success ? 'green' : 'red', textAlign: 'center', marginBottom: '1em' }}>
                                {msg}
                                </div>)}
                            <Button
                                variant="primary"
                                type="button"
                                onClick={() => {
                                    if (!categoriaId || !nombre || !descripcion || precio==0 || cantCopias==0
                                    ) {
                                        setMsg("Debe completar todos los campos");
                                        setSuccess(false);
                                        return;
                                    } else {
                                        fetchs.createVideojuego(id, nombre, descripcion, precio, cantCopias, categoriaId, setMsg, setSuccess, setListaVideojuegos);
                                      setNombre('');
                                      setDescripcion('');
                                      setPrecio(0); 
                                      setCantCopias(0);
                                      setCategoriaId('');
                                      setMsg('');
                                    }
                                }}
                                style={{ marginTop: '2.5%', width: '30%', marginLeft: '33.33%' }}
                            >
                                Aceptar
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        <Table striped bordered hover style={{ marginTop: '2.5%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Cantidad de Copias</th>
                                    <th>Categoría</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {listaVideojuegos.map((videojuego) => (
                                    <tr key={videojuego.id}>
                                        <td>{videojuego.id}</td>
                                        <td>{videojuego.nombre}</td>
                                        <td>{videojuego.descripcion}</td>
                                        <td>{videojuego.precio}</td>
                                        <td>{videojuego.cantCopias}</td>
                                        <td>{videojuego.categoria ? videojuego.categoria.id : "N/A"}</td>
                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button
                                                    variant='danger'
                                                    onClick={() => {
                                                        fetchs.deleteVideojuego(videojuego.id, setMsg, setSuccess, setListaVideojuegos);
                                                    }}
                                                >
                                                    Eliminar
                                                </Button>
                                                <Button
                                                    style={{ backgroundColor: '#007BFF', color: 'white', border: 'none' }}
                                                    onClick={() => fillForm(videojuego.id)}
                                                >
                                                    Modificar
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
   
        </div>
    );
};

export default Videojuegos;
