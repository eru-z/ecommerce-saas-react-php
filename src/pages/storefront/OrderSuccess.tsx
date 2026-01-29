import { CheckCircle } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

export const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <div className="max-w-md text-center space-y-6">
        <CheckCircle className="mx-auto h-16 w-16 text-green-400" />
        <h1 className="text-3xl font-semibold">Order placed!</h1>
        <p className="text-white/60">
          Your order <strong>#{id}</strong> has been successfully created.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md bg-white text-black px-6 py-3 font-medium"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
};
