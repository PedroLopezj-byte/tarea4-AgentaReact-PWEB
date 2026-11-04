import { useState } from "react";

export default function FormularioContacto({ contactoInicial, onGuardar, onCancelar }) {
  const vacio = { nombre: "", telefono: "", correo: "" };
  const [datos, setDatos] = useState(contactoInicial || vacio);

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  }

  async function enviar(e) {
    e.preventDefault();
    const ok = await onGuardar(datos);
    if (ok && !contactoInicial) setDatos(vacio);
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <h2>{contactoInicial ? "Editar contacto" : "Nuevo contacto"}</h2>
      <input name="nombre" placeholder="Nombre" value={datos.nombre} onChange={cambiar} />
      <input name="telefono" placeholder="Teléfono" value={datos.telefono} onChange={cambiar} />
      <input name="correo" placeholder="Correo (opcional)" value={datos.correo} onChange={cambiar} />
      <div className="botones">
        <button type="submit" className="primario">
          {contactoInicial ? "Guardar cambios" : "Agregar"}
        </button>
        {contactoInicial && (
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
