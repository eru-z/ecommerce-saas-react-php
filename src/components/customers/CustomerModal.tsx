import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const CustomerModal = ({ open, customer, onClose, onSave }: any) => {
  const [form, setForm] = useState<any>({
    id: '',
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (customer) setForm(customer);
    else setForm({ id: '', name: '', email: '', phone: '' });
  }, [customer]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative z-10 w-[420px] rounded-lg bg-neutral-900 p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          {customer ? 'Edit Customer' : 'New Customer'}
        </h2>

        <Input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <Input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <Input
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <div className="flex justify-end gap-2 pt-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(form)}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
