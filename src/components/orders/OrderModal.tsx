import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

const STATUS_OPTIONS = [
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

export const OrderModal = ({ open, order, onClose, onSave }: any) => {
  const [form, setForm] = useState({
    id: '',
    orderNumber: '',
    customer: { name: '', email: '' },
    total: 0,
    status: 'processing',
  })

  const [statusOpen, setStatusOpen] = useState(false)

  /* ================= SYNC EDIT / CREATE ================= */
  useEffect(() => {
    if (order) {
      setForm({
        id: order.id ?? '',
        orderNumber: order.orderNumber ?? '',
        customer: {
          name: order.customer?.name ?? '',
          email: order.customer?.email ?? '',
        },
        total: Number(order.total) || 0,
        status: order.status ?? 'processing',
      })
    }
  }, [order])

  if (!open) return null

  const isValid =
    form.orderNumber.trim() &&
    form.customer.name.trim() &&
    /\S+@\S+\.\S+/.test(form.customer.email) &&
    form.total > 0

  const currentStatus = STATUS_OPTIONS.find(
    s => s.value === form.status
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-[420px] rounded-xl p-6 space-y-4 z-10
                      bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-2xl">

        <h2 className="text-lg font-semibold">
          {order ? 'Edit Order' : 'New Order'}
        </h2>

        <Input
          placeholder="Order Number"
          value={form.orderNumber}
          onChange={e => setForm({ ...form, orderNumber: e.target.value })}
          className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400"
        />

        <Input
          placeholder="Customer Name"
          value={form.customer.name}
          onChange={e =>
            setForm({
              ...form,
              customer: { ...form.customer, name: e.target.value },
            })
          }
          className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400"
        />

        <Input
          type="email"
          placeholder="Customer Email"
          value={form.customer.email}
          onChange={e =>
            setForm({
              ...form,
              customer: { ...form.customer, email: e.target.value },
            })
          }
          className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400"
        />

        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="Total"
          value={form.total}
          onChange={e =>
            setForm({ ...form, total: Number(e.target.value) })
          }
          className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400"
        />

        {/* ===== MODERN DROPDOWN ===== */}
        <div className="relative">
          <label className="block text-sm text-zinc-400 mb-1">
            Status
          </label>

          <button
            type="button"
            onClick={() => setStatusOpen(v => !v)}
            className="w-full flex items-center justify-between
                       rounded-md px-3 py-2
                       bg-zinc-800 border border-zinc-700
                       text-zinc-100 hover:border-zinc-600
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span>{currentStatus?.label}</span>
            <svg
              className={`w-4 h-4 transition ${
                statusOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {statusOpen && (
            <div
              className="absolute mt-2 w-full rounded-md
                         bg-zinc-900 border border-zinc-700
                         shadow-xl overflow-hidden z-50"
            >
              {STATUS_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    setForm({ ...form, status: option.value })
                    setStatusOpen(false)
                  }}
                  className={`w-full px-3 py-2 text-left text-sm
                              hover:bg-zinc-800 transition
                              ${
                                form.status === option.value
                                  ? 'bg-zinc-800 text-indigo-400'
                                  : 'text-zinc-200'
                              }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!isValid} onClick={() => onSave(form)}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
