import { Search, Mail, Phone, Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
import { CustomerModal } from '../../components/customers/CustomerModal';
import { mockCustomers } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/format';

export const Customers = () => {
  const [customers, setCustomers] = useState<any[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any | null>(null);

  /* =====================
     CRUD
  ===================== */
  const openAdd = () => {
    setEditingCustomer(null);
    setModalOpen(true);
  };

  const openEdit = (customer: any) => {
    setEditingCustomer(customer);
    setModalOpen(true);
  };

  const saveCustomer = (customer: any) => {
    if (customer.id) {
      setCustomers(prev =>
        prev.map(c => (c.id === customer.id ? customer : c))
      );
    } else {
      setCustomers(prev => [
        {
          ...customer,
          id: crypto.randomUUID(),
          joinedAt: new Date().toISOString(),
          totalOrders: 0,
          totalSpent: 0,
        },
        ...prev,
      ]);
    }
    setModalOpen(false);
  };

  const deleteCustomer = (id: string) => {
    if (!confirm('Delete this customer?')) return;
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  /* =====================
     FILTER
  ===================== */
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="space-y-12 text-white">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-[32px] font-semibold tracking-tight">
          Customers
        </h1>
        <p className="max-w-xl text-sm text-neutral-400">
          Customer profiles, order history, and lifetime value insights
        </p>
      </header>

      <div className="rounded-2xl border border-white/10 bg-neutral-900">
        <Card>

          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base font-medium">
                Customers
                <span className="ml-2 text-sm text-neutral-500">
                  {filteredCustomers.length}
                </span>
              </CardTitle>

              <div className="flex gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search customers"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="h-10 w-full rounded-lg border border-white/10 bg-neutral-800 pl-9 pr-3 text-sm text-white"
                  />
                </div>

                <Button onClick={openAdd}>
                  <Plus className="mr-2 h-4 w-4" />
                  New
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardBody className="p-0">
            <Table>

              <TableHead>
                <TableRow className="text-neutral-400">
                  <TableHeader>Customer</TableHeader>
                  <TableHeader>Contact</TableHeader>
                  <TableHeader>Orders</TableHeader>
                  <TableHeader>Lifetime Value</TableHeader>
                  <TableHeader>Joined</TableHeader>
                  <TableHeader />
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCustomers.map(customer => (
                  <TableRow key={customer.id}>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-semibold">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {customer.name}
                          </div>
                          <div className="text-xs text-neutral-500">
                            ID · {customer.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1 text-sm text-neutral-400">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
                    <TableCell>{formatDate(customer.joinedAt)}</TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        {/* EDIT */}
                        <Button
                          size="sm"
                          variant="outline"
                          className="p-2"
                          onClick={() => openEdit(customer)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        {/* DELETE */}
                        <Button
                          size="sm"
                          variant="danger"
                          className="p-2"
                          onClick={() => deleteCustomer(customer.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </CardBody>

        </Card>
      </div>

      <CustomerModal
        open={modalOpen}
        customer={editingCustomer}
        onClose={() => setModalOpen(false)}
        onSave={saveCustomer}
      />
    </section>
  );
};
