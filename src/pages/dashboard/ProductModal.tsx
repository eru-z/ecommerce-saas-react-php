import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const ProductModal = ({ open, product, onClose, onSave }: any) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    status: 'active',
    image: '',
    description: '',
  });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
      <div className="w-full max-w-lg rounded-2xl bg-neutral-900 p-6 space-y-5">
        <h2 className="text-lg font-semibold text-white">
          {product ? 'Edit Product' : 'Add Product'}
        </h2>

        <div className="grid gap-3">
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} />
          <Input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: +e.target.value })} />
          <Input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave({ ...form, id: product?.id })}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
