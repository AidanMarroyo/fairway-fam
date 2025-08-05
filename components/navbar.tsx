'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/react';
import Image from 'next/image';
import { ThemeSwitch } from './theme-switch';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { useState } from 'react';

export default function FairwayFamNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    <Navbar maxWidth='full'>
      <NavbarContent
        className='hidden items-center sm:flex gap-4 '
        justify='start'
      >
        {siteConfig.navItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
              color={`${pathname === `${item.href}` ? 'secondary' : 'foreground'}`}
              href={`${item.href}`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
      <NavbarMenu>
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className='w-full'
              color={`${pathname === `${item.href}` ? 'secondary' : 'foreground'}`}
              href={`${item.href}`}
              size='lg'
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <NavbarContent className='flex items-center' justify='center'>
        <NavbarBrand>
          <Image
            src='/logos/text-transparent.png'
            width={500} // Or keep 300 if you want
            height={500} // Set height close to nav height (48px is usually good)
            alt='FairwayFam'
            className='object-contain h-48' // Ensure aspect ratio is preserved
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as='div' justify='end'>
        <ThemeSwitch />
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name='Jason Hughes'
              size='sm'
              src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold'>zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key='settings'>My Settings</DropdownItem>
            <DropdownItem key='team_settings'>Team Settings</DropdownItem>
            <DropdownItem key='analytics'>Analytics</DropdownItem>
            <DropdownItem key='system'>System</DropdownItem>
            <DropdownItem key='configurations'>Configurations</DropdownItem>
            <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
            <DropdownItem key='logout' color='danger'>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
