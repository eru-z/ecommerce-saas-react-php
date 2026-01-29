import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // ✅ validations
    if (formData.name.trim().length < 3) {
      setError('Full name must be at least 3 characters');
      return;
    }

    if (!formData.name.includes(' ')) {
      setError('Please enter first and last name');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/auth/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const text = await res.text();
      console.log('REGISTER RESPONSE:', text);

      const data = JSON.parse(text);

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed');
      }

      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <section className="w-full max-w-md">
        <div className="rounded-3xl bg-gradient-to-br from-blue-600/40 via-indigo-600/40 to-purple-600/40 p-[1px] shadow-2xl">
          <div className="rounded-3xl bg-neutral-900 p-6">
            <header className="mb-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="rounded-xl bg-neutral-800 p-3 ring-1 ring-white/10">
                  <Store className="h-8 w-8 text-blue-500" />
                </div>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Create account
              </h1>

              <p className="text-sm text-neutral-400">
                Provision new system access
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <Input
                label="Full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                required
              />

              <Input
                type="email"
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <Input
                type="password"
                label="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              <Input
                type="password"
                label="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
              >
                {loading ? 'Creating account…' : 'Create account'}
              </Button>

              <p className="text-center text-xs text-neutral-500">
                Already provisioned?{' '}
                <Link to="/login" className="text-blue-400">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
