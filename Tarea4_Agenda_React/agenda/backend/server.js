// Servicio web REST con Express para la Agenda de contactos
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());          // permite peticiones desde React (otro puerto)
app.use(express.json());  // permite leer JSON en el body

// "Base de datos" en memoria
let contactos = [
  { id: 1, nombre: "Juan Pérez", telefono: "809-555-1234", correo: "juan@correo.com" },
  { id: 2, nombre: "María Gómez", telefono: "829-555-5678", correo: "maria@correo.com" },
];
let siguienteId = 3;

function validar({ nombre, telefono, correo }) {
  if (!nombre || !nombre.trim()) return "El nombre es obligatorio";
  if (!telefono || !telefono.trim()) return "El teléfono es obligatorio";
  if (correo && !/^\S+@\S+\.\S+$/.test(correo)) return "El correo no es válido";
  return null;
}

// GET: listar todos
app.get("/api/contactos", (req, res) => {
  res.json(contactos);
});

// GET: obtener uno
app.get("/api/contactos/:id", (req, res) => {
  const contacto = contactos.find((c) => c.id === Number(req.params.id));
  if (!contacto) return res.status(404).json({ error: "Contacto no encontrado" });
  res.json(contacto);
});

// POST: crear
app.post("/api/contactos", (req, res) => {
  const error = validar(req.body);
  if (error) return res.status(400).json({ error });
  const { nombre, telefono, correo = "" } = req.body;
  const nuevo = { id: siguienteId++, nombre: nombre.trim(), telefono: telefono.trim(), correo: correo.trim() };
  contactos.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT: actualizar
app.put("/api/contactos/:id", (req, res) => {
  const contacto = contactos.find((c) => c.id === Number(req.params.id));
  if (!contacto) return res.status(404).json({ error: "Contacto no encontrado" });
  const error = validar(req.body);
  if (error) return res.status(400).json({ error });
  const { nombre, telefono, correo = "" } = req.body;
  contacto.nombre = nombre.trim();
  contacto.telefono = telefono.trim();
  contacto.correo = correo.trim();
  res.json(contacto);
});

// DELETE: eliminar
app.delete("/api/contactos/:id", (req, res) => {
  const antes = contactos.length;
  contactos = contactos.filter((c) => c.id !== Number(req.params.id));
  if (contactos.length === antes) return res.status(404).json({ error: "Contacto no encontrado" });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
