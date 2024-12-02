import { useState } from 'react';
import { User } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface ProfileFormProps {
  user: User;
  onSubmit: (data: Partial<User>) => void;
}

export function ProfileForm({ user, onSubmit }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        required
      />

      <Button type="submit">Save Changes</Button>
    </form>
  );
}