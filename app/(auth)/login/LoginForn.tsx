'use client';

import { Button } from '@heroui/button';
import { Form, Input } from '@heroui/react';
import { useState, useTransition } from 'react';

export default function LoginForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <Input
        type='password'
        isRequired
        name='password'
        label='Password'
        labelPlacement='outside'
        placeholder='********'
        validate={(value) => {
          if (!value) return 'Please enter your password';
          if (value.length < 6) return 'Password must be at least 6 characters';
          if (value.length > 20)
            return 'Password must be less than 20 characters';
          if (!/[A-Z]/.test(value))
            return 'Password must contain at least one uppercase letter';
          if (!/[a-z]/.test(value))
            return 'Password must contain at least one lowercase letter';
          if (!/[0-9]/.test(value))
            return 'Password must contain at least one number';
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
            return 'Password must contain at least one special character';
        }}
      />
      <Button type='submit' variant='bordered'>
        Submit
      </Button>
    </Form>
  );
}
