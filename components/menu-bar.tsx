'use client';

import Link from 'next/link';
import { HiBellAlert, HiBookmark, HiHome } from 'react-icons/hi2';
import { BiSolidMessageSquareDots } from 'react-icons/bi';
import { Button } from '@heroui/button';
import { usePathname } from 'next/navigation';

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  const pathname = usePathname();
  return (
    <div className={className}>
      <Button
        className='flex items-center justify-center gap-3'
        title='Home'
        variant={pathname === '/' ? undefined : 'ghost'}
      >
        <Link href='/'>
          <div className='flex gap-2 items-center w-[105px]'>
            <HiHome size={24} />
            <span className='hidden lg:inline text-xs'>Home</span>
          </div>
        </Link>
      </Button>

      <Button
        variant={pathname === '/notifications' ? undefined : 'ghost'}
        className='flex items-center justify-center gap-3'
        title='Notifications'
      >
        <Link href='/notifications'>
          <div className='flex gap-2 items-center w-[105px]'>
            <HiBellAlert size={24} />
            <span className='hidden lg:inline text-xs'>Notifications</span>
          </div>
        </Link>
      </Button>

      <Button
        variant={pathname === '/messages' ? undefined : 'ghost'}
        className='flex items-center justify-center gap-3'
        title='Messages'
      >
        <Link href='/messages'>
          <div className='flex gap-2 items-center w-[105px] '>
            <BiSolidMessageSquareDots size={24} />
            <span className='hidden lg:inline text-xs'>Messages</span>
          </div>
        </Link>
      </Button>

      <Button
        variant={pathname === '/bookmarks' ? undefined : 'ghost'}
        className='flex items-center justify-center gap-3'
        title='Bookmarks'
      >
        <Link href='/bookmarks'>
          <div className='flex gap-2 items-center w-[105px]'>
            <HiBookmark size={24} />
            <span className='hidden lg:inline text-xs'>Bookmarks</span>
          </div>
        </Link>
      </Button>
    </div>
  );
}
