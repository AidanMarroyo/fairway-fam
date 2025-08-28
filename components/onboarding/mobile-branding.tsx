export default function MobileOnboardBranding() {
  return (
    <div className='mb-8 flex items-center justify-center space-x-4 lg:hidden'>
      <a href='#' className='flex items-center text-2xl font-semibold'>
        <img alt='' src='/logos/lg-transparent.png' className='mr-2 h-8 w-8' />
        <img
          alt=''
          src='/logos/text-transparent.png'
          className='ml-2 h-32 w-32'
        />
        {/* <span className='text-gray-900 dark:text-white'>FairwayFam</span> */}
      </a>
    </div>
  );
}
