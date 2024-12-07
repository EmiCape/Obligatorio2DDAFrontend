import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

import { useEffect, useState } from 'react';

import fetchs from '../fetchs'; 

import 'bootstrap/dist/css/bootstrap.min.css';

const Categorias = (props) => {
    const [listaCategorias, setListaCategorias] = useState(props.listaCategorias);
    const [categoria, setCategoria] = useState(null);
    const [msg, setMsg] = useState(null);
    const [success, setSuccess] = useState(null);
   
  
    const [idCategoria, setIdCategoria] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        fetchs.listCategorias(setListaCategorias);
       
      }, []);


    const fillForm = (idCategoria) => {
        fetchs.getCategoria(idCategoria)
        .then(data => {
            setCategoria(data);
            setIdCategoria(data.id);
            setNombre(data.nombre);
            setDescripcion(data.descripcion);
        })
        .catch(error => {
            console.error('Error al obtener la categoría:', error);
        });
    };

    return (
        <div className='Categorias' style={{ marginTop: "5%" }}>
            <Container>
                <Row>
                    <Col>
                  
                        <Form> <Form.Group className="mb-3">
                                <Form.Label>Id</Form.Label>
                                <Form.Control 
                                    value={idCategoria} 
                                    onChange={(e) => setIdCategoria(e.target.value)} 
                                    type="number" 
                                    placeholder="Id" 
                                    disabled
                                    

                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control 
                                    value={nombre} 
                                    onChange={(e) => setNombre(e.target.value)} 
                                    type="text" 
                                    placeholder="Nombre de la categoría" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control 
                                    value={descripcion} 
                                    onChange={(e) => setDescripcion(e.target.value)} 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="Descripción de la categoría" 
                                />
                            </Form.Group>
                            {msg && (
                            <div style={{ color: success ? 'green' : 'red', textAlign: 'center', marginBottom: '1em' }}>
                                {msg}
                            </div>
                        )}
                            <Button 
                                variant="primary" 
                                type="button" 
                                onClick={() => { if (!nombre || !descripcion
                                ) {
                                    setMsg("Debe completar todos los campos");
                                    setSuccess(false);
                                    return;
                                } else {
                                    fetchs.createCategoria(idCategoria, nombre, descripcion,  setListaCategorias, setMsg, setSuccess);
                                    setNombre('');
                                    setDescripcion('');
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
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaCategorias.map((categoria) => (
                                    <tr key={categoria.id}>
                                        <td>{categoria.id}</td>
                                        <td>{categoria.nombre}</td>
                                        <td>{categoria.descripcion}</td>
                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button variant='danger' onClick={() => {
                                                    fetchs.deleteCategoria(categoria.id, setListaCategorias, setMsg, setSuccess);
                                                }}>
                                                    Eliminar
                                                </Button>
                                                <Button 
                                                    style={{ backgroundColor: '#007BFF', color: 'white', border: 'none' }} 
                                                    onClick={() => fillForm(categoria.id)}
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

export default Categorias;
