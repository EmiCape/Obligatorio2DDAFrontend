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

const UsuarioPremium = () => {
    const [listaUsuariosPremium, setListaUsuariosPremium] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [msg, setMsg] = useState(null);
    const [success, setSuccess] = useState(null);

    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [fechaRegistro, setFechaRegistro] = useState('');
    const [fechaObtenida, setFechaObtenida] = useState('');

    useEffect(() => {
        fetchs.listUsuariosPremium(setListaUsuariosPremium);
    }, []);

    const fillForm = (idUsuarioPremium) => {
        fetchs.getUsuarioPremium(idUsuarioPremium)
            .then(data => {
                setUsuario(data);
                setId(data.id);
                setNombre(data.nombre);
                setEmail(data.email);
                setFechaRegistro(data.fechaIngreso);
                setFechaObtenida(data.fechaObtenida);
            })
            .catch(error => {
                console.error('Error al obtener el usuario premium:', error);
            });
    };

    return (
        <div className='UsuarioPremium' style={{ marginTop: "5%" }}>
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
                                    value={nombre} 
                                    onChange={(e) => setNombre(e.target.value)} 
                                    type="text" 
                                    placeholder="Nombre del usuario" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    placeholder="Email del usuario" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de Ingreso</Form.Label>
                                <Form.Control 
                                    value={fechaRegistro} 
                                    onChange={(e) => setFechaRegistro(e.target.value)} 
                                    type="date"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha Obtenida</Form.Label>
                                <Form.Control 
                                    value={fechaObtenida} 
                                    onChange={(e) => setFechaObtenida(e.target.value)} 
                                    type="date"
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
                                onClick={() => {
                                    if (!nombre || !email || !fechaRegistro || !fechaObtenida) {
                                        setMsg("Debe completar todos los campos");
                                        setSuccess(false);
                                        return;
                                    } else {
                                        const nuevoUsuario = { id, nombre, email, fechaRegistro, fechaObtenida };
                                        fetchs.createUsuarioPremium(nuevoUsuario, setListaUsuariosPremium);
                                        setNombre('');
                                        setEmail('');
                                        setFechaRegistro('');
                                        setFechaObtenida('');
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
                                    <th>Email</th>
                                    <th>Fecha Ingreso</th>
                                    <th>Fecha Obtenida</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaUsuariosPremium.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.fechaRegistro}</td>
                                        <td>{usuario.fechaObtenida}</td>
                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button variant='danger' onClick={() => {
                                                    fetchs.deleteUsuarioPremium(usuario.id, setListaUsuariosPremium);
                                                }}>
                                                    Eliminar
                                                </Button>
                                                <Button 
                                                    style={{ backgroundColor: '#007BFF', color: 'white', border: 'none' }} 
                                                    onClick={() => fillForm(usuario.id)}
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

export default UsuarioPremium;
