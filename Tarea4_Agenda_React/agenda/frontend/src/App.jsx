import { useEffect, useState } from "react";
import FormularioContacto from "./components/FormularioContacto.jsx";
import ListaContactos from "./components/ListaContactos.jsx";
import {
  obtenerContactos,
  crearContacto,
  actualizarContacto,
  eliminarContacto,
} from "./api.js";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [editando, setEditando] = useState(null); // contacto en edición
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");

  // Cargar contactos al iniciar
  useEffect(() => {
    obtenerContactos()
      .then(setContactos)
      .catch(() => setError("No se pudo conectar con el servidor. ¿Está corriendo el backend?"));
  }, []);

  async function guardar(datos) {
    try {
      setError("");
      if (editando) {
        const actualizado = await actualizarContacto(editando.id, datos);
        setContactos(contactos.map((c) => (c.id === actualizado.id ? actualizado : c)));
        setEditando(null);
      } else {
        const nuevo = await crearContacto(datos);
        setContactos([...contactos, nuevo]);
      }
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  }

  async function eliminar(id) {
    if (!window.confirm("¿Eliminar este contacto?")) return;
    try {
      await eliminarContacto(id);
      setContactos(contactos.filter((c) => c.id !== id));
      if (editando && editando.id === id) setEditando(null);
    } catch (e) {
      setError(e.message);
    }
  }

  const filtrados = contactos.filter((c) =>
    `${c.nombre} ${c.telefono} ${c.correo}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenedor">
      <h1>📒 Agenda de Contactos</h1>

      {error && <p className="error">{error}</p>}

      <FormularioContacto
        key={editando ? editando.id : "nuevo"}
        contactoInicial={editando}
        onGuardar={guardar}
        onCancelar={() => setEditando(null)}
      />

      <input
        className="buscador"
        type="text"
        placeholder="Buscar por nombre, teléfono o correo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <ListaContactos contactos={filtrados} onEditar={setEditando} onEliminar={eliminar} />
    </div>
  );
}
