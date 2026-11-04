import Contacto from "./Contacto.jsx";

export default function ListaContactos({ contactos, onEditar, onEliminar }) {
  if (contactos.length === 0) {
    return <p className="vacio">No hay contactos para mostrar.</p>;
  }
  return (
    <ul className="lista">
      {contactos.map((c) => (
        <Contacto key={c.id} contacto={c} onEditar={onEditar} onEliminar={onEliminar} />
      ))}
    </ul>
  );
}
