import MenuBar from '@/components/menu-bar';
import FairwayFamNavbar from '@/components/navbar';
import { Link } from '@heroui/link';

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex flex-col h-screen'>
      <FairwayFamNavbar />
      <div className='flex min-h-screen flex-col'>
        <div className='mx-auto flex w-full max-w-7xl grow gap-5 p-5'>
          <MenuBar className='sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80' />
          {children}
        </div>
        <MenuBar className='sticky bottom-0 flex w-full justify-center gap-3 border-t bg-card p-3 sm:hidden' />
      </div>
      <footer className='w-full flex items-center justify-center py-3'>
        <Link
          isExternal
          className='flex items-center gap-1 text-current'
          href='https://heroui.com?utm_source=next-app-template'
          title='heroui.com homepage'
        >
          <span className='text-default-600'>Powered by</span>
          <p className='text-primary'>HeroUI</p>
        </Link>
      </footer>
    </div>
  );
}
