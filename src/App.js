import io from 'socket.io-client';
import { useState, useEffect } from 'react';
//https://server-push-production.up.railway.app/
const socket = io('https://server-push-production.up.railway.app/');

function App() {
  const [mensaje, setMensaje] = useState('');
  const [sala, setSala] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [flag, setFlag] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit('subscribe', sala);
    setFlag(true)
  }
  function handleSubmit2(e) {
    e.preventDefault();
    socket.emit('subscribe', sala);
    socket.emit('send message', mensaje);
    
    setMensajes([...mensajes, {
      usuario: 'Yo',
      contenido: mensaje
    }]);
    setMensaje('');
  }
 
  useEffect(() => {
    socket.on('back', value => {
      setMensajes([...mensajes, { ...value }])
    });
  }, [mensajes]);

  return (
    <div id='principal'>
      <h1>Chat en vivo</h1>
        
      <form onSubmit={handleSubmit}>
        <label>
          Key secreta;
          <input type="text" onChange={e => setSala(e.target.value)} value={sala} />
        </label>
        <button >Enviar</button>
      </form>
      {flag > 0 && <h3>Chat secreto:{sala}</h3>}
      Programador Juan Isa
      <form onSubmit={handleSubmit2}>
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
