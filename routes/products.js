const express = require("express");
const router = express.Router();
const { materials } = require("./materials");

let products = [];
let nextProductId = 1;

// Criar produto
router.post("/", (req, res) => {
  const { code, name, price } = req.body;
  const product = { id: nextProductId++, code, name, price, compositions: [] };
  products.push(product);
  res.json(product);
});

// Listar produtos
router.get("/", (req, res) => res.json(products));

// Detalhes de um produto
router.get("/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ error: "Produto não encontrado" });

  const detailedCompositions = product.compositions.map(c => {
    const material = materials.find(m => m.id == c.materialId);
    return { ...c, materialCode: material.code, materialName: material.name };
  });

  res.json({ ...product, compositions: detailedCompositions });
});

// Adicionar composição
router.post("/:id/compositions", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ error: "Produto não encontrado" });

  const { materialId, quantity } = req.body;
  if (!materialId || !quantity) return res.status(400).json({ error: "Preencha materialId e quantity" });

  const material = materials.find(m => m.id == materialId);
  if (!material) return res.status(404).json({ error: "Matéria-prima não encontrada" });

  const composition = { id: product.compositions.length + 1, materialId, quantity };
  product.compositions.push(composition);

  res.json(composition);
});

module.exports = { router, products };