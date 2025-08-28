export default function OnboardBranding() {
  return (
    <div className='mb-8 flex items-center space-x-4'>
      <img alt='' src='/logos/full-transparent.png' className='contain h-32' />

      <a
        href='#'
        className='inline-flex items-center text-sm font-medium text-primary-100 hover:text-white'
      >
        <svg
          className='mr-1 h-6 w-6'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
        Go back
      </a>
    </div>
  );
}
