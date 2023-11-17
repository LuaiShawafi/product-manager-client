import './App.css';
import ProductForm from './components/ProductForm/ProductForm';
import ProductTable from './components/ProductTable/ProductTable';
import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm) {
          const url = /^\d+$/.test(searchTerm)
            ? `https://localhost:8000/products/${searchTerm}`
            : `https://localhost:8000/products?name=${searchTerm}`;

          const resp = await fetch(url);

          if (!resp.ok) {
            if (resp.status === 404) {
              // Product not found
              setSearchResult([]);
              return;
            }
            throw new Error(`HTTP error! Status: ${resp.status}`);
          }

          const data = await resp.json();
          const searchResultData = Array.isArray(data) ? data : [data];
          setSearchResult(searchResultData);
        } else {
          const resp = await fetch('https://localhost:8000/products');

          if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
          }

          const productsData = await resp.json();
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const onAdd = async (product) => {
    try {
      const resp = await fetch("https://localhost:8000/products", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }

      const newProduct = await resp.json();
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const onDelete = async (productSku) => {
    try {
      const resp = await fetch(`https://localhost:8000/products/${productSku}`, {
        method: "delete",
      });

      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }

      const newProducts = products.filter((x) => x.sku !== productSku);
      setProducts(newProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
      <ProductTable
        products={searchResult.length > 0 ? searchResult : products}
        onDelete={onDelete}
      />
    </div>
  );
}

export default App;
