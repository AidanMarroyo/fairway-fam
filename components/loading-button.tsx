import { cn } from '@/lib/utils';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/react';

import { ReactNode } from 'react';

type LoadingButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?:
    | 'bordered'
    | 'solid'
    | 'light'
    | 'flat'
    | 'faded'
    | 'shadow'
    | 'ghost'
    | undefined;
};

export default function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={loading || disabled}
      className={cn('flex items-center gap-2', className)}
      {...props}
      type={props.type || 'button'}
      variant={props.variant || 'solid'}
    >
      {props.children}
      {loading && <Spinner color='success' size='sm' />}
    </Button>
  );
}
