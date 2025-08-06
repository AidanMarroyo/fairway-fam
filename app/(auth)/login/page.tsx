import loginImage from '@/public/images/bogdankrupin.jpg';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './LoginForn';
import GoogleSignInButton from './google/GoogleSignInButton';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className='flex h-screen items-center justify-center p-5'>
      <div className='flex h-full max-h-[45rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl'>
        <div className='w-full space-y-6 overflow-y-auto p-8 md:w-1/2'>
          <Image
            src='/logos/full-transparent.png'
            alt='Fairway Fam'
            width={500}
            height={500}
            className='object-contain sm:h-48 h-24'
          />
          <h1 className='text-left text-2xl font-bold sm:text-center sm:text-3xl'>
            Where your swing meets your circle.
          </h1>
          <div className='space-y-5'>
            <GoogleSignInButton />
            <div className='flex items-center gap-3'>
              <div className='h-px flex-1 bg-muted' />
              <span>OR</span>
              <div className='h-px flex-1 bg-muted' />
            </div>
            <LoginForm />
            <Link href='/sign-up' className='block text-center hover:underline'>
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt='bogdan-krupin'
          className='hidden w-1/2 object-cover md:block'
        />
      </div>
    </main>
  );
}
