import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, ButtonGroup } from 'react-bootstrap';
import fetchs from '../fetchs';

const Venta = ({ listaVideojuegos }) => {
  const [clienteId, setClienteId] = useState(null);
  const [videojuegosSeleccionados, setVideojuegosSeleccionados] = useState([]);
  const [videojuegoSeleccionado, setVideojuegoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [fechaCompra, setFechaCompra] = useState(null)
  const [usuarios, setUsuarios] = useState([]);
  const [listaVentas, setListaVentas] = useState([]);

  useEffect(() => {
    fetchs.getUsuariosCombinados()
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error al cargar usuarios:', error));
  }, []);

  useEffect(() => {
    fetchs.listVentas(setListaVentas);
  }, []);

  const handleAgregarVideojuego = () => {
    const videojuego = listaVideojuegos.find(v => v.nombre === videojuegoSeleccionado);
    if (videojuego) {
      const nuevaVenta = {
        videojuego,
        cantidad,
        monto: videojuego.precio * cantidad,
      };
      setVideojuegosSeleccionados([...videojuegosSeleccionados, nuevaVenta]);
    }
  };

  const handleEliminarVideojuego = (index) => {
    const nuevaLista = videojuegosSeleccionados.filter((_, i) => i !== index);
    setVideojuegosSeleccionados(nuevaLista);
  };

  const montoTotal = videojuegosSeleccionados.reduce((total, item) => total + item.monto, 0);

  const handleComprar = () => {
    const venta = {
      fechaCompra: fechaCompra, 
      usuario: { id: clienteId },
      videojuegosVenta: videojuegosSeleccionados.map(v => ({
        cantidad: v.cantidad,
        videojuego: { id: v.videojuego.id }
      })),
      montoTotal,
    };

    fetchs.createVenta(venta, setListaVentas);

    setClienteId(null);
    setVideojuegosSeleccionados([]);
    setFechaCompra(null); 
  };
  

  const sumarUnDia = (fecha) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1); 
    return nuevaFecha.toLocaleDateString(); 
  };
  

  return (
    <div className="Venta" style={{ marginTop: '5%' }}>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Seleccione un cliente</Form.Label>
                <Form.Select
                  value={clienteId || ''}
                  onChange={(e) => setClienteId(e.target.value)}
                  aria-label="Seleccionar cliente"
                >
                  <option value="" disabled>Seleccione un cliente</option>
                  {usuarios.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {`${cliente.id}, ${cliente.nombre}`}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Seleccione un videojuego</Form.Label>
                <Form.Select
                  value={videojuegoSeleccionado}
                  onChange={(e) => setVideojuegoSeleccionado(e.target.value)}
                  aria-label="Seleccionar videojuego"
                >
                  <option value="" disabled>Seleccione un videojuego</option>
                  {listaVideojuegos.map((videojuego) => (
                    <option key={videojuego.nombre} value={videojuego.nombre}>
                      {videojuego.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  value={cantidad}
                  min={1}
                  onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleAgregarVideojuego}>
                Agregar Videojuego
              </Button>

              <Form.Group className="mb-3" style={{ marginTop: '1rem' }}>
                <Form.Label>Fecha de compra</Form.Label>
                <Form.Control 
                  type="date" 
                  value={fechaCompra} 
                  onChange={(e) => setFechaCompra(e.target.value)} 
                />
              </Form.Group>
            </Form>
          </Col>

          <Col>
            <Table striped bordered hover style={{ marginTop: '2.5%' }}>
              <thead>
                <tr>
                  <th>Videojuego</th>
                  <th>Cantidad</th>
                  <th>Monto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {videojuegosSeleccionados.map((item, index) => (
                  <tr key={index}>
                    <td>{item.videojuego.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.monto}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleEliminarVideojuego(index)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h4>Total: {montoTotal}</h4>
          </Col>
        </Row>

        <Button variant="primary" onClick={handleComprar}>
          Comprar
        </Button>
        <Row>
          <Col>
            <h3>Historial de Ventas</h3>
            <Table striped bordered hover style={{ marginTop: '2.5%' }}>
              <thead>
                <tr>
                  <th>ID Venta</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Monto Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaVentas.map((venta) => (
                  <tr key={venta.id}>
                    <td>{venta.id}</td>
                    <td>{venta.usuario ? venta.usuario.nombre : 'Cliente desconocido'}</td>
                    <td>{sumarUnDia(venta.fechaCompra)}</td>
                    <td>${venta.montoTotal}</td>
                    <td>
                      <ButtonGroup size="sm">
                        <Button variant='danger' onClick={() => fetchs.deleteVenta(venta.id, setListaVentas)}>
                          Eliminar
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

export default Venta;
