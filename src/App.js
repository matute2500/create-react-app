import React, { useState } from 'react';
import './App.css';

function App() {
  const [fecha, setFecha] = useState('');
  const [tipo, setTipo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('Enviando...');

    try {
      const res = await fetch('https://script.google.com/macros/s/AKfycbyKzZ5637fposQKjpUfOqTYQAc_gdu-KPAz8KOmy-Ezdb0O5MA90QIyBx0nrhj6TZvyzA/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha, tipo }),
      });

      if (res.ok) {
        setMensaje('✅ Datos enviados correctamente');
        setFecha('');
        setTipo('');
      } else {
        setMensaje('❌ Error al enviar los datos');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error de red o servidor');
    }
  };

  return (
    <div className="container">
      <h2>Formulario de Partido</h2>
      <form onSubmit={handleSubmit}>
        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />

        <label>Tipo de Partido:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
          <option value="">-- Selecciona una opción --</option>
          <option value="LIGA">LIGA</option>
          <option value="AMISTOSO">AMISTOSO</option>
          <option value="CAMPEONATO">CAMPEONATO</option>
        </select>

        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}

export default App;

