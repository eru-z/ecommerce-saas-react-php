import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import { useState } from 'react';

import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

import { mockProducts } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';

import { ProductModal } from './ProductModal';

export const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  /* FILTER */
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* CRUD HANDLERS */
  const handleAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSave = (product: any) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      setProducts((prev) => [
        { ...product, id: crypto.randomUUID() },
        ...prev,
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this product?')) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section className="space-y-12">
      {/* PAGE HERO */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-white/70">
            <Package className="h-5 w-5" />
            <span className="text-xs uppercase tracking-widest">
              Inventory
            </span>
          </div>

          <h1 className="text-[36px] font-semibold tracking-tight text-white">
            Products
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-white/60">
            Manage your catalog, pricing, stock levels, and product visibility
          </p>
        </div>

        <Button size="lg" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </header>

      {/* DATA SURFACE */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-neutral-900/60 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-white">
              All Products
              <span className="ml-2 text-xs text-white/50">
                {filteredProducts.length}
              </span>
            </CardTitle>

            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <Input
                placeholder="Search by name or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Product</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Stock</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader className="text-right">Actions</TableHeader>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-xl border border-neutral-800">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {product.name}
                        </div>
                        <div className="text-xs text-white/50 truncate max-w-[240px]">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-white/80">
                    {product.category}
                  </TableCell>

                  <TableCell className="text-white font-medium">
                    {formatCurrency(product.price)}
                  </TableCell>

                  <TableCell>
                    <span className={product.stock < 20 ? 'text-rose-400' : 'text-white'}>
                      {product.stock}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge variant={product.status === 'active' ? 'success' : 'default'}>
                      {product.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="inline-flex gap-1">
                      <button
                        onClick={() => handleEdit(product)}
                        className="rounded-lg p-2 text-white/50 hover:bg-neutral-800/60 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg p-2 text-rose-400/80 hover:bg-rose-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <ProductModal
        open={modalOpen}
        product={editingProduct}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </section>
  );
};
