export default function Contacto({ contacto, onEditar, onEliminar }) {
  return (
    <li className="contacto">
      <div>
        <strong>{contacto.nombre}</strong>
        <span>📞 {contacto.telefono}</span>
        {contacto.correo && <span>✉️ {contacto.correo}</span>}
      </div>
      <div className="botones">
        <button onClick={() => onEditar(contacto)}>Editar</button>
        <button className="peligro" onClick={() => onEliminar(contacto.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}
