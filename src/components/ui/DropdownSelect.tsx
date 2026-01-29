import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Option = {
  label: string;
  value: string;
};

export const DropdownSelect = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <div className="relative space-y-1">
      <label className="text-sm text-neutral-400">{label}</label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-white/10 bg-neutral-900 px-3 text-sm text-white"
      >
        {selected?.label}
        <ChevronDown className="h-4 w-4 text-neutral-400" />
      </button>

      {open && (
        <div className="absolute z-20 w-full rounded-md border border-white/10 bg-neutral-900">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="block w-full px-3 py-2 text-left text-sm hover:bg-white/10"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
