import React, { useState } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';

const ListarVentasPorFecha = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(''); 
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState(null); 

  const obtenerVentasPorFecha = () => {
    if (!fechaSeleccionada) {
      setError('Por favor, seleccione una fecha.');
      setVentas([]);
      return;
    }

    setError(null); 

    fetch(`http://localhost:5000/venta/filtrarPorFecha?fechaCompra=${fechaSeleccionada}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          setError('No se encontraron ventas para esta fecha.');
        } else {
          setVentas(data);
        }
      })
      .catch(error => {
        setError('Error al cargar ventas.');
        console.error(error);
      });
  };

  const sumarUnDia = (fecha) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1); 
    return nuevaFecha.toLocaleDateString(); 
  };

  return (
    <Container style={{ marginTop: '5%' }}>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Seleccione una Fecha</Form.Label>
              <Form.Control
                type="date"
                value={fechaSeleccionada}
                onChange={(e) => setFechaSeleccionada(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={obtenerVentasPorFecha}>
              Buscar Ventas
            </Button>
          </Form>
        </Col>
      </Row>

      {error && <Row><Col><p style={{ color: 'red' }}>{error}</p></Col></Row>}

      <Row>
        <Col>
          <h3>Ventas en la Fecha Seleccionada</h3>
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
                    <td>{sumarUnDia(venta.fechaCompra)}</td> 
                    <td>${venta.montoTotal}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No se encontraron ventas para esta fecha.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListarVentasPorFecha;
