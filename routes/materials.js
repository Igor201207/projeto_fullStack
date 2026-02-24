const express = require("express");
const router = express.Router();

let materials = [];
let nextMaterialId = 1;

// Criar matéria-prima
router.post("/", (req, res) => {
  const { code, name, stock } = req.body;
  if (!code || !name || stock == undefined) return res.status(400).json({ error: "Preencha code, name e stock" });

  const material = { id: nextMaterialId++, code, name, stock };
  materials.push(material);
  res.json(material);
});

// Listar matérias-primas
router.get("/", (req, res) => res.json(materials));

// Detalhes de uma matéria-prima
router.get("/:id", (req, res) => {
  const material = materials.find(m => m.id == req.params.id);
  if (!material) return res.status(404).json({ error: "Matéria-prima não encontrada" });
  res.json(material);
});

// Atualizar matéria-prima
router.put("/:id", (req, res) => {
  const material = materials.find(m => m.id == req.params.id);
  if (!material) return res.status(404).json({ error: "Matéria-prima não encontrada" });

  const { code, name, stock } = req.body;
  if (code) material.code = code;
  if (name) material.name = name;
  if (stock != undefined) material.stock = stock;

  res.json(material);
});

// Remover matéria-prima
router.delete("/:id", (req, res) => {
  const index = materials.findIndex(m => m.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Matéria-prima não encontrada" });

  const removed = materials.splice(index, 1);
  res.json({ message: "Matéria-prima removida", removed });
});

module.exports = { router, materials };