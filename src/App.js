import './App.css';
import ProductForm from './components/ProductForm/ProductForm';
import ProductTable from './components/ProductTable/ProductTable';
import { useEffect, useState } from 'react';

function App() {

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    fetch(`https://localhost:8000/products${searchTerm ? `?searchTerm=${searchTerm}` : ''}`)
      .then(resp => { 
        if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
      return resp.json();
  })
      .then(products => setProducts(products));

  }, [searchTerm]);

  const onAdd = (product) => {

    fetch("https://localhost:3000/products", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product)
    }).then(resp => resp.json()).then(product => setProducts([...products, product]));

  }

    const onDelete = (productSku) => {
      
      fetch(`https://localhost:3000/products/${productSku}`, {
        method: "delete"
      }).then(() => {

        var newProducts = products.filter(x => x.sku !== productSku);

        setProducts(newProducts);
      });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="App">
      <h1>Product Manager</h1>
      <ProductForm onAdd={onAdd} />
      <input
      type='text'
      placeholder='Search by name or SKU'
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      />
      <ProductTable products={products} onDelete={onDelete} />
    </div>
  );
}

export default App;
