import { Input, InputProps } from '@heroui/input';
import React, { useState } from 'react';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className='relative w-full'>
        <Input
          {...props}
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          isRequired
          name='password'
          label='Password'
          labelPlacement='outside'
          placeholder='●●●●●●●●'
          validate={(value) => {
            if (!value) return 'Please enter your password';
            if (value.length < 8)
              return 'Password must be at least 8 characters';
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
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          title={showPassword ? 'Hide password' : 'Show password'}
          className='absolute right-3 top-11 -translate-y-1/2 transform text-muted-foreground'
        >
          {showPassword ? (
            <HiEyeSlash className='size-5' />
          ) : (
            <HiEye className='size-5' />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
