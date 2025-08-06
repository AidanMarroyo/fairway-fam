import loginImage from '@/public/images/kindelmedia.jpg';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SignUpForm from './SignUpForm';

export const metadata: Metadata = {
  title: 'Login',
};

export default function SignUp() {
  return (
    <main className='flex h-screen items-center justify-center p-5'>
      <div className='flex h-full max-h-[45rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl'>
        <div className='w-full space-y-6 overflow-y-hidden p-8 md:w-1/2'>
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
            <SignUpForm />
            <Link href='/login' className='block text-center hover:underline'>
              Already have an account? Login
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt='kindelmedia'
          className='hidden w-1/2 object-cover md:block'
        />
      </div>
    </main>
  );
}
