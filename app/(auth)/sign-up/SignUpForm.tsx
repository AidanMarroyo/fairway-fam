'use client';

import { PasswordInput } from '@/components/password-input';
import { Button } from '@heroui/button';
import { Form, Input } from '@heroui/react';
import { useState, useTransition } from 'react';

export default function SignUpForm() {
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
      <PasswordInput />
      <Input
        type='password'
        isRequired
        name='confirm-password'
        label='Confirm Password'
        labelPlacement='outside'
        placeholder='●●●●●●●●'
        validate={(value) => {
          if (
            value !==
            (
              document.querySelector(
                'input[name="password"]'
              ) as HTMLInputElement | null
            )?.value
          ) {
            return 'Passwords do not match';
          }
        }}
      />
      <Button type='submit' variant='bordered' className='mt-6'>
        Submit
      </Button>
    </Form>
  );
}
