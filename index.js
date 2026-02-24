const express = require("express");
const app = express();
app.use(express.json());

// ------------------ ARRAYS DE ARMAZENAMENTO ------------------
let products = [];
let nextId = 1;

let materials = [];
let nextMaterialId = 1;

// ------------------ ROTAS DE PRODUTOS ------------------

// Criar produto
app.post("/products", (req, res) => {
    const { code, name, price } = req.body;
    const product = { id: nextId++, code, name, price, compositions: [] };
    products.push(product);
    res.json(product);
});

// Listar produtos
app.get("/products", (req, res) => res.json(products));

// Detalhes de um produto
app.get("/products/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(product);
});

// Adicionar composição vinculando a matéria-prima real
app.post("/products/:id/compositions", (req, res) => {
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

// ------------------ ROTAS DE MATÉRIAS-PRIMAS ------------------

// Criar matéria-prima
app.post("/materials", (req, res) => {
    const { code, name, stock } = req.body;
    if (!code || !name || stock == undefined) return res.status(400).json({ error: "Preencha code, name e stock" });

    const material = { id: nextMaterialId++, code, name, stock };
    materials.push(material);
    res.json(material);
});

// Listar matérias-primas
app.get("/materials", (req, res) => res.json(materials));

// Detalhes de uma matéria-prima
app.get("/materials/:id", (req, res) => {
    const material = materials.find(m => m.id == req.params.id);
    if (!material) return res.status(404).json({ error: "Matéria-prima não encontrada" });
    res.json(material);
});

// Atualizar matéria-prima
app.put("/materials/:id", (req, res) => {
    const material = materials.find(m => m.id == req.params.id);
    if (!material) return res.status(404).json({ error: "Matéria-prima não encontrada" });

    const { code, name, stock } = req.body;
    if (code) material.code = code;
    if (name) material.name = name;
    if (stock != undefined) material.stock = stock;

    res.json(material);
});

// Remover matéria-prima
app.delete("/materials/:id", (req, res) => {
    const index = materials.findIndex(m => m.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Matéria-prima não encontrada" });

    const removed = materials.splice(index, 1);
    res.json({ message: "Matéria-prima removida", removed });
});

// ------------------ ROTA DE SUGESTÃO DE PRODUÇÃO ------------------
app.get("/production-suggestion", (req, res) => {
    const suggestion = [];
    const stock = materials.map(m => ({ ...m })); // clone do estoque

    const sortedProducts = [...products].sort((a, b) => b.price - a.price);

    sortedProducts.forEach(product => {
        let maxQty = Infinity;

        product.compositions.forEach(c => {
            const material = stock.find(m => m.id == c.materialId);
            if (!material) return;
            const possible = Math.floor(material.stock / c.quantity);
            if (possible < maxQty) maxQty = possible;
        });

        if (maxQty > 0 && maxQty !== Infinity) {
            product.compositions.forEach(c => {
                const material = stock.find(m => m.id == c.materialId);
                material.stock -= c.quantity * maxQty;
            });

            suggestion.push({ productId: product.id, quantity: maxQty });
        }
    });

    res.json(suggestion);
});

// Exporta o app para testes
module.exports = app;