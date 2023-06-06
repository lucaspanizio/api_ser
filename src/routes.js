import { Router } from "express";
import {
  insert,
  update,
  destroy,
  getAll,
  getById,
  getByName,
} from "./controller/ProviderDAO.js";

const router = Router();
const BASE_REQ = "/providers";

// Rota padrão
router.get("/", (req, res) => {
  res.json({ message: "Bem vindo a api_ser!" });
});

// Insere um novo prestador
router.post(BASE_REQ, (req, res) => {
  let provider = req.body;
  insert(provider)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(400).json({ error: err }));
});

// Altera o prestador pelo id
router.put(`${BASE_REQ}/:id`, (req, res) => {
  let id = req.params.id;
  let new_provider = req.body;

  update(id, new_provider)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ error: err }));
});

// Remove o prestador pelo id
router.delete(`${BASE_REQ}/:id`, (req, res) => {
  let id = req.params.id;
  destroy(id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ error: err }));
});

// Consulta por trecho do nome
router.get(`${BASE_REQ}/search`, (req, res) => {
  let name = req.query.name;
  getByName(name)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ error: err }));
});

// Consulta pelo id
router.get(`${BASE_REQ}/:id`, (req, res) => {
  let id = req.params.id;
  getById(id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ error: err }));
});

// Retorna todos os prestadores
router.get(BASE_REQ, (req, res) => {
  getAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ error: err }));
});

function log(req, res) {
  console.log(`
    ${new Date().toLocaleString()}
    Method:  ${req.method}
    Request: ${req.headers.host}${req.path} 
    Body:    ${JSON.stringify(req.body)}
    Params:  ${JSON.stringify(req.params)}
    Status:  ${res.statusCode} ${res.statusMessage}
  `);
}

export default router;
