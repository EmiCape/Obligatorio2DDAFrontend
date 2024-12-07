import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchs from '../fetchs';

const ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]); 
    const [error, setError] = useState(null); 
    const [tipo, setTipo] = useState(''); 

 
    const cargarUsuariosEstandar = () => {
        fetchs.listUsuariosEstandar(setUsuarios);
           setTipo("estandar")
    };

    
    const cargarUsuariosPremium = () => {
        fetchs.listUsuariosPremium(setUsuarios)
        setTipo("premium")
    };

    return (
        <Container style={{ marginTop: '5%' }}>
            <Row>
                <Col>
                    <h3>Listar Usuarios ({tipo || "Seleccione un tipo"})</h3>
                    <Button
                        variant="primary"
                        onClick={cargarUsuariosEstandar}
                        style={{ marginRight: '10px' }}
                    >
                        Usuarios Estándar
                    </Button>
                    <Button variant="secondary" onClick={cargarUsuariosPremium}>
                        Usuarios Premium
                    </Button>
                </Col>
            </Row>
            <Row style={{ marginTop: '3%' }}>
                <Col>
                    {error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Fecha Registro</th>
                                    {tipo === 'premium' && <th>Fecha Obtenida</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.fechaRegistro}</td>
                                        {tipo === 'premium' && <td>{usuario.fechaObtenida}</td>}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ListarUsuarios;
