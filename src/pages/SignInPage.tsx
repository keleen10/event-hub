import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function SignInPage() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication - replace with actual API call
    if (email === 'admin@example.com' && password === 'admin') {
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      });
      navigate('/');
    } else if (email === 'user@example.com' && password === 'user') {
      setUser({
        id: '2',
        name: 'Regular User',
        email: 'user@example.com',
        role: 'user'
      });
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-8">Sign In</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-blue-600 hover:text-blue-700"
              >
                Sign Up
              </button>
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            {/* <p className="text-sm text-gray-600 text-center mb-2">Demo Accounts:</p> */}
            <div className="space-y-1 text-sm text-gray-500">
              {/* <p>Admin: admin@example.com / admin</p>
              <p>User: user@example.com / user</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}