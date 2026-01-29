import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      const res = await fetch('/api/auth/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const text = await res.text();
      console.log('LOGIN RESPONSE:', text);

      const data = JSON.parse(text);

if (!res.ok || !data.success) {
  throw new Error(data.error || 'Login failed');
}

localStorage.setItem('user', JSON.stringify(data.user));
navigate('/dashboard');

    } catch (err: any) {
      setError(err.message || 'Login failed');
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
                Sign in
              </h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <Input
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>

              <p className="text-center text-xs text-neutral-500">
                No account?{' '}
                <Link to="/register" className="text-blue-400">
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
