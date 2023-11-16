import "./ProductForm.css";

import { useState } from "react";

const ProductForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = { ...form, type: parseInt(form.sku) };

    onAdd(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Namn</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={(event) =>
          setForm({
            ...form,
            name: event.target.value,
          })
        }
      />

      <label>SKU</label>
      <input
        type="text"
        name="sku"
        value={form.sku}
        onChange={(event) =>
          setForm({
            ...form,
            sku: event.target.value,
          })
        }
      />

      <label>Beskrivning</label>
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={(event) =>
          setForm({
            ...form,
            description: event.target.value,
          })
        }
      />

      <label>Bild (URL)</label>
      <input
        type="text"
        name="imageUrl"
        value={form.imageUrl}
        onChange={(event) =>
          setForm({
            ...form,
            imageUrl: event.target.value,
          })
        }
      />

      <label>Pris</label>
      <input
        type="text"
        name="price"
        value={form.price}
        onChange={(event) =>
          setForm({
            ...form,
            price: event.target.value,
          })
        }
      />

      <button>Lägg till</button>
    </form>
  );
};

export default ProductForm;
