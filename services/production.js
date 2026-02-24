function suggestProduction(products, materials) {
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

  return suggestion;
}

module.exports = { suggestProduction };