const listCategorias = (setLista) => {
    fetch('http://localhost:5000/categorias')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setLista(data);
            console.log('Categorías:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

const getCategoria = (idCategoria) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/categorias/'+ idCategoria, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const createCategoria = (idCategoria, nombre, descripcion, setListaCategorias, setMsg, setSuccess) => {
    fetch('http://localhost:5000/categorias', {
        method: 'POST',
        body: JSON.stringify({
            id: idCategoria,
            nombre: nombre,
            descripcion: descripcion
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        setListaCategorias(prevCategorias => [...prevCategorias, data]);
        setMsg("Categoría creada exitosamente");
        setSuccess(true);
        console.log('Categoría creada:', data);
    })
    .catch(error => {
        setMsg("Error al crear la categoría");
        setSuccess(false);
        console.error('Error al crear la categoría:', error);
    });
};

const deleteCategoria = (idCategoria, setListaCategorias, setMsg, setSuccess) => {
    fetch('http://localhost:5000/categorias/' + idCategoria, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        setListaCategorias(prevCategorias => prevCategorias.filter(categoria => categoria.id !== idCategoria));
        setMsg("Categoría eliminada exitosamente");
        setSuccess(true);
        console.log('Categoría eliminada:', data);
    })
    .catch(error => {
        setMsg("Error al eliminar la categoría");
        setSuccess(false);
        console.error('Error al eliminar la categoría:', error);
    });
};





const listVideojuegos = (setLista) => {
    fetch('http://localhost:5000/videojuego')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Videojuegos recibidos:', data);
            setLista(data);
        })
        .catch(error => {
            console.error('Error al obtener los videojuegos:', error);
        });
}


const getVideojuego = (idVideojuego) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/videojuego/' +idVideojuego, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const createVideojuego = (id, nombre, descripcion, precio, cantCopias, categoriaId, setMsg, setSuccess, setListaVideojuegos) => {
    fetch('http://localhost:5000/videojuego', {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            cantCopias: cantCopias,
            categoria: { id: categoriaId }
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setMsg("Videojuego creado con éxito");
            setSuccess(true);
            
            setListaVideojuegos(prevVideojuegos => [...prevVideojuegos, data]);
            console.log('Videojuego creado:', data);
        })
        .catch(error => {
            setMsg(error.message);
            setSuccess(false);
            console.error('Fetch error:', error);
        });
};


const deleteVideojuego = (idVideojuego, setMsg, setSuccess, setListaVideojuegos) => {
    fetch('http://localhost:5000/videojuego/' + idVideojuego, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            setMsg("Videojuego eliminado con éxito");
            setSuccess(true);
            // Actualiza la lista localmente eliminando el videojuego eliminado
            setListaVideojuegos(prevVideojuegos => prevVideojuegos.filter(videojuego => videojuego.id !== idVideojuego));
            console.log('Videojuego eliminado:', data);
        })
        .catch(error => {
            setMsg(error.message);
            setSuccess(false);
            console.error('Fetch error:', error);
        });
};
    

const listUsuariosPremium = (setLista) => {
    fetch('http://localhost:5000/usuariosPremium')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setLista(data);
            console.log('Usuarios Premium:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

const getUsuarioPremium = (idUsuarioPremium) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/usuariosPremium/' + idUsuarioPremium, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const createUsuarioPremium = (usuarioPremium, setListaUsuariosPremium) => {
    fetch('http://localhost:5000/usuariosPremium', {
        method: 'POST',
        body: JSON.stringify(usuarioPremium),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            listUsuariosPremium(setListaUsuariosPremium);
            console.log('Usuario Premium creado:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
};

const deleteUsuarioPremium = (idUsuarioPremium, setListaUsuariosPremium) => {
    fetch('http://localhost:5000/usuariosPremium/' + idUsuarioPremium, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            listUsuariosPremium(setListaUsuariosPremium);
            console.log('Usuario Premium eliminado:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
};

const listUsuariosEstandar = (setLista) => {
    fetch('http://localhost:5000/usuarioEstandar')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setLista(data);
            console.log('Usuarios Estándar:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

const getUsuarioEstandar = (idUsuarioEstandar) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/usuarioEstandar/' + idUsuarioEstandar, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const createUsuarioEstandar = (usuarioEstandar, setListaUsuariosEstandar) => {
    fetch('http://localhost:5000/usuarioEstandar', {
        method: 'POST',
        body: JSON.stringify(usuarioEstandar),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            listUsuariosEstandar(setListaUsuariosEstandar);
            console.log('Usuario Estándar creado:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
};


const deleteUsuarioEstandar = (idUsuarioEstandar, setListaUsuariosEstandar) => {
    fetch('http://localhost:5000/usuarioEstandar/' + idUsuarioEstandar, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            listUsuariosEstandar(setListaUsuariosEstandar);
            console.log('Usuario Estándar eliminado:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
};

const listVentas = (setLista) => {
    fetch('http://localhost:5000/venta')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setLista(data);
            console.log('Ventas:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

const getVenta = (idVenta) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/venta/' + idVenta, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const createVenta = (venta, setListaVentas) => {
    console.log(venta.fechaCompra)
    fetch('http://localhost:5000/venta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(venta), 
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => { 
          throw new Error(`Error del servidor: ${err.message || response.statusText}`);
        });
      }
      return response.json(); 
    })
    .then(data => {
      setListaVentas(prev => [...prev, data]);
      console.log('Venta creada:', data);
    })
    .catch(error => {
      console.error('Error al crear la venta:', error);
    });
  };


const deleteVenta = (idVenta, setListaVentas) => {
    fetch('http://localhost:5000/venta/' + idVenta, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            listVentas(setListaVentas);  
            console.log('Venta eliminada:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

const getUsuariosCombinados = async () => {
    try {
      const responseEstandar = await fetch('http://localhost:5000/usuarioEstandar'); 
      const responsePremium = await fetch('http://localhost:5000/usuariosPremium'); 

      const usuariosEstandar = await responseEstandar.json();
      const usuariosPremium = await responsePremium.json();


      const usuariosCombinados = [...usuariosEstandar, ...usuariosPremium];

      return usuariosCombinados; 
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error; 
    }
  };





export default { getUsuariosCombinados, listVentas, getVenta, createVenta, deleteVenta, listCategorias,getCategoria,createCategoria,deleteCategoria,listVideojuegos,getVideojuego,createVideojuego,deleteVideojuego, listUsuariosEstandar, getUsuarioEstandar,createUsuarioEstandar,deleteUsuarioEstandar,listUsuariosPremium,createUsuarioPremium,getUsuarioPremium,deleteUsuarioPremium};