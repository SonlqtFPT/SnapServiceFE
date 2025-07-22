'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createUser } from '@/services/users/userService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';

export default function AddUser() {
  const { role } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    role: typeof role === 'string' ? role : 'customer',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.username.trim()) newErrors.username = '*Please enter a username.';
    if (!form.fullname.trim()) newErrors.fullname = '*Please enter full name.';

    if (!form.email.trim()) {
      newErrors.email = '*Please enter an email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = '*Invalid email format.';
    }

    if (!form.password.trim()) newErrors.password = '*Please enter a password.';

    if (!form.phone.trim()) {
      newErrors.phone = '*Please enter a phone number.';
    } else if (!/^\d{9,11}$/.test(form.phone)) {
      newErrors.phone = '*Invalid phone number.';
    }

    if (!form.address.trim()) newErrors.address = '*Please enter an address.';

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting data:', form);
      const result = await createUser(form);
      console.log('User created successfully:', result);

      toast.success('User created successfully!');
      setTimeout(() => {
        router.push(`/admin/users/${role}`);
      }, 3000);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      console.error('Create user error:', error);
      toast.error(
        error?.response?.data?.message || 'An error occurred while creating the user. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  const getInputClass = (field: string) =>
    `w-full ${errors[field] ? 'border-red-500 border' : 'focus:border-blue-500 focus:ring-blue-500'} transition-colors`;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add {role}</h1>

      <div className="flex flex-col gap-4">
        {[
          { name: 'username', placeholder: 'Username' },
          { name: 'fullname', placeholder: 'Full Name' },
          { name: 'email', placeholder: 'Email' },
          { name: 'password', placeholder: 'Password', type: 'password' },
          { name: 'phone', placeholder: 'Phone Number' },
          { name: 'address', placeholder: 'Address' },
        ].map(({ name, placeholder, type }) => (
          <div key={name}>
            <Input
              placeholder={placeholder}
              type={type || 'text'}
              className={getInputClass(name)}
              value={form[name as keyof typeof form]}
              onChange={(e) => {
                setForm({ ...form, [name]: e.target.value });
                setErrors({ ...errors, [name]: '' });
              }}
            />
            {errors[name] && (
              <p className="text-sm text-red-600 mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        <Button className="mt-4" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create'}
        </Button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
