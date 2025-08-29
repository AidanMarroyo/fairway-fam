'use client';
import LoadingButton from '@/components/loading-button';
import { PasswordInput } from '@/components/password-input';
import { addToast, Form, Input } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (data: { [key: string]: FormDataEntryValue }) => {
    try {
      setSubmitting(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: data['email'],
          password: data['password'],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return addToast({
          title: 'Login failed',
          description: `${errorData.error || 'An error occurred'}`,
        });
      }

      const result = await response.json();
      if (result.status === 200) {
        addToast({
          title: 'Login successful',
          description: 'Head out to the tee box!',
        });
        if (result.onboarded) {
          router.push('/');
        } else {
          router.push('/onboarding');
        }
      } else {
        addToast({
          title: 'Login failed',
          description: 'An unexpected error occurred. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error during Login:', error);
      addToast({
        title: 'Login failed',
        description:
          'An unexpected error occurred. If this error persists, contact support.',
      });
    } finally {
      setSubmitting(false);
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(e.currentTarget));

      delete data['confirm-password'];

      handleSubmit(data);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        type='email'
        isRequired
        name='email'
        label='Email'
        labelPlacement='outside'
        placeholder='welovefairwayfam@fairwayfam.com'
        validate={(value) => {
          if (!value) return 'Please enter your email';
        }}
      />
      <PasswordInput onChange={(e) => setPassword(e.target.value)} />
      <LoadingButton
        loading={submitting}
        type='submit'
        variant='bordered'
        className='mt-6'
      >
        {submitting ? 'FORE!' : 'Login'}
      </LoadingButton>
    </Form>
  );
}
