import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import fetchs from '../fetchs';

const FiltrarVentasPorUsuario = () => {
  const [usuarios, setUsuarios] = useState([]); 
  const [ventas, setVentas] = useState([]); 
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); 
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    fetchs.getUsuariosCombinados()
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error al cargar usuarios:', error));
  }, []);

  
  useEffect(() => {
    if (usuarioSeleccionado) {
      fetch('http://localhost:5000/venta/filtrarPorUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioSeleccionado), 
      })
        .then(response => response.json())
        .then(data => setVentas(data))
        .catch(error => {
          setVentas([]);
        });
    }
  }, [usuarioSeleccionado]);

  return (
    <Container style={{ marginTop: '5%' }}>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Seleccione un Cliente</Form.Label>
              <Form.Select
                value={usuarioSeleccionado ? usuarioSeleccionado.id : ''}
                onChange={(e) => {
                  const usuario = usuarios.find(u => u.id === parseInt(e.target.value));
                  setUsuarioSeleccionado(usuario);
                }}
                aria-label="Seleccionar cliente"
              >
                <option value="" disabled>Seleccione un cliente</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {`${usuario.id}, ${usuario.nombre}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      {error && <Row><Col><p style={{ color: 'red' }}>{error}</p></Col></Row>}

      <Row>
        <Col>
          <h3>Ventas del Cliente</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Venta</th>
                <th>Fecha</th>
                <th>Monto Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length > 0 ? (
                ventas.map((venta) => (
                  <tr key={venta.id}>
                    <td>{venta.id}</td>
                    <td>{new Date(venta.fechaCompra).toLocaleDateString()}</td>
                    <td>${venta.montoTotal}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No se encontraron ventas para este usuario.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default FiltrarVentasPorUsuario;
