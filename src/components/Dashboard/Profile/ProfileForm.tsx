import { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  location: string;
  avatar: string;
  skills: string[];
}

interface ProfileFormProps {
  user: User;
  setUser: (user: User) => void;
}

function ProfileForm({ user, setUser }: ProfileFormProps) {
  const [formData, setFormData] = useState(user);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="student">Student</option>
              <option value="professional">Professional</option>
              <option value="founder">Founder</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSave} className="cursor-pointer">
              Save Changes
            </Button>
            {saveSuccess && (
              <p className="text-green-600 flex items-center">Profile updated successfully</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
