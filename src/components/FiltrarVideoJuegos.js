import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

const FiltrarVideojuegos = () => {
    const [stock, setStock] = useState(''); 
    const [videojuegos, setVideojuegos] = useState([]); 
    const [error, setError] = useState(null); 

   
    const buscarVideojuegos = () => {
      
        const url = new URL('http://localhost:5000/videojuego/filtrarPorStock');
        if (stock) url.searchParams.append('cantCopias', stock);

        fetch(url.toString())
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al buscar videojuegos');
                }
                return response.json();
            })
            .then(data => {
                setVideojuegos(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setVideojuegos([]); 
            });
    };

    return (
        <Container style={{ marginTop: '5%' }}>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Filtrar por stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese el stock máximo"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)} 
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={buscarVideojuegos}>
                            Filtrar
                        </Button>
                    </Form>
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
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {videojuegos.map((videojuego) => (
                                    <tr key={videojuego.id}>
                                        <td>{videojuego.id}</td>
                                        <td>{videojuego.nombre}</td>
                                        <td>{videojuego.descripcion}</td>
                                        <td>{videojuego.precio}</td>
                                        <td>{videojuego.cantCopias}</td>
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

export default FiltrarVideojuegos;
