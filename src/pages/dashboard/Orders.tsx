import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from '../../components/ui/Card';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '../../components/ui/Table';

import { Button } from '../../components/ui/Button';
import { OrderModal } from '../../components/orders/OrderModal';

type Order = {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  total: number;
  status: string;
  createdAt: string;
};

const API = 'http://localhost/ecommerce_saas/api/orders';

export const Orders = () => {
  /* ================= STATE ================= */
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  /* ================= FETCH ================= */
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/get.php`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= OPEN MODAL ================= */
  const openCreate = () => {
    setEditingOrder(null);
    setModalOpen(true);
  };

  const openEdit = (order: Order) => {
    setEditingOrder(order);
    setModalOpen(true);
  };

  /* ================= SAVE ================= */
  const saveOrder = async (order: any) => {
    const isEdit = Boolean(order?.id && order.id.length > 0);

    const payload = {
      id: isEdit ? order.id : crypto.randomUUID(),
      orderNumber: order.orderNumber,
      customer: order.customer,
      total: Number(order.total),
      status: order.status,
      items: [
        {
          productId: 'manual',
          productName: 'Manual order',
          quantity: 1,
          price: Number(order.total),
        },
      ],
    };

    try {
      await fetch(
        `${API}/${isEdit ? 'update.php' : 'create.php'}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      setModalOpen(false);
      setEditingOrder(null);
      fetchOrders();
    } catch (err) {
      console.error('Save failed', err);
      alert('Save failed');
    }
  };

  /* ================= DELETE ================= */
  const deleteOrder = async (id: string) => {
    if (!confirm('Delete this order?')) return;

    try {
      await fetch(`${API}/delete.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      setOrders(prev => prev.filter(o => o.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Orders</CardTitle>
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </CardHeader>

        <CardBody>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Order</TableHeader>
                  <TableHeader>Customer</TableHeader>
                  <TableHeader>Total</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader className="text-right" />
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.orderNumber}
                    </TableCell>

                    <TableCell>
                      <div>{order.customer.name}</div>
                      <div className="text-sm opacity-60">
                        {order.customer.email}
                      </div>
                    </TableCell>

                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.createdAt}</TableCell>

                    <TableCell className="flex gap-2 justify-end">
                      <Button
  size="sm"
  variant="outline"
  className="p-2"
  onClick={() => openEdit(order)}
>
  <Pencil className="w-4 h-4" />
</Button>

<Button
  size="sm"
  variant="outline"
  className="p-2"
  onClick={() => deleteOrder(order.id)}
>
  <Trash2 className="w-4 h-4 text-red-500" />
</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* MODAL */}
      <OrderModal
        open={modalOpen}
        order={editingOrder}
        onClose={() => {
          setModalOpen(false);
          setEditingOrder(null);
        }}
        onSave={saveOrder}
      />
    </>
  );
};
