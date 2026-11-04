// Funciones para comunicarse con el servicio web Express
const URL_API = "http://localhost:3000/api/contactos";

async function manejar(respuesta) {
  if (!respuesta.ok) {
    const datos = await respuesta.json().catch(() => ({}));
    throw new Error(datos.error || "Error en la petición");
  }
  return respuesta.status === 204 ? null : respuesta.json();
}

export const obtenerContactos = () => fetch(URL_API).then(manejar);

export const crearContacto = (contacto) =>
  fetch(URL_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contacto),
  }).then(manejar);

export const actualizarContacto = (id, contacto) =>
  fetch(`${URL_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contacto),
  }).then(manejar);

export const eliminarContacto = (id) =>
  fetch(`${URL_API}/${id}`, { method: "DELETE" }).then(manejar);
