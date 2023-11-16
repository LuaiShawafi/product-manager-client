import React from "react";
import "./ProductTable.css";

const ProductTable = ({ products, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Namn</th>
        <th>SKU</th>
        <th>Beskrivning</th>
        <th>Bild (URL)</th>
        <th>Pris</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.sku}</td>
          <td>{product.description}</td>
          <td>{product.imageUrl}</td>
          <td>{product.price}</td>
          <td>
            <button onClick={() => onDelete(product.id)}>X</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductTable;
