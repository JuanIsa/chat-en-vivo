import io from 'socket.io-client';
import { useState, useEffect } from 'react';
const socket = io('https://server-push-production.up.railway.app/');

function App() {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit('mensajeDesdeFront', mensaje);
    setMensaje('');
    setMensajes([...mensajes, {
      usuario: 'Yo',
      contenido: mensaje
    }]);
  }
  useEffect(() => {
    socket.on('mensajedelBak', value => {
      setMensajes([...mensajes, { ...value }])
    });
  }, [mensajes]);
  return (
    <div id='principal'>
      Programador Juan Isa
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setMensaje(e.target.value)} value={mensaje} />
        <button >Enviar</button>
      </form>
      {mensajes.map((item, index) => {
        return (
          <div key={index}>
            <p>El usuario "{item.usuario}" dice : {item.contenido}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
