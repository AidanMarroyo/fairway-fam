'use client';
import LoadingButton from '@/components/loading-button';
import { PasswordInput } from '@/components/password-input';
import { Button } from '@heroui/button';
import { addToast, Form, Input } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpForm() {
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (data: { [key: string]: FormDataEntryValue }) => {
    try {
      setSubmitting(true);

      const response = await fetch('/api/auth/sign-up', {
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
          title: 'Sign up failed',
          description: `${errorData.error || 'An error occurred'}`,
        });
      }

      const result = await response.json();
      if (result.success) {
        addToast({
          title: 'Sign up successful',
          description: 'You have successfully signed up!',
        });
        router.push('/');
      } else {
        addToast({
          title: 'Sign up failed',
          description: 'An unexpected error occurred. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      addToast({
        title: 'Sign up failed',
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
      <Input
        type='password'
        isRequired
        name='confirm-password'
        label='Confirm Password'
        labelPlacement='outside'
        placeholder='●●●●●●●●'
        validate={(value) => {
          if (!value) return 'Please confirm your password';
          if (value !== password) return 'Passwords do not match';
        }}
      />
      <LoadingButton
        loading={submitting}
        type='submit'
        variant='bordered'
        className='mt-6'
      >
        {submitting ? 'FORE!' : 'Sign Up'}
      </LoadingButton>
    </Form>
  );
}
