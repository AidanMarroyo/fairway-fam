import React from 'react';

type Step = {
  /** Primary label, e.g., "Account" */
  label: string;
  /** Optional secondary bit, e.g., "Info" (shown on sm+) */
  sublabel?: string;
};

type StepperProps = {
  steps: Step[];
  /** 0-based index of the current step */
  current: number;
  /** Optional click handler to allow jumping between steps */
  onStepChange?: (index: number) => void;
  className?: string;
};

function classNames(...xs: (string | false | null | undefined)[]) {
  return xs.filter(Boolean).join(' ');
}

export default function Stepper({
  steps,
  current,
  onStepChange,
  className,
}: StepperProps) {
  return (
    <ol
      className={classNames(
        'mb-6 flex items-center text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base lg:mb-12',
        className
      )}
      role='list'
      aria-label='Progress'
    >
      {steps.map((step, idx) => {
        const isCompleted = idx < current;
        const isCurrent = idx === current;

        const circle = (
          <div
            className={classNames(
              'mr-2 flex h-6 w-6 items-center justify-center rounded-full border text-xs sm:mx-auto sm:mb-2',
              isCompleted
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : isCurrent
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 bg-white dark:bg-gray-800'
            )}
          >
            {isCompleted ? (
              // check mark
              <svg
                className='h-4 w-4'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3A1 1 0 016.293 9.293L8.5 11.5l6.543-6.543a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <span>{idx + 1}</span>
            )}
          </div>
        );

        const content = (
          <div className="flex items-center after:mx-2 after:text-gray-300 after:content-['/'] dark:after:text-gray-500 sm:block sm:after:hidden">
            {circle}
            <span
              className={classNames(
                isCurrent
                  ? 'text-gray-900 dark:text-white'
                  : isCompleted
                    ? 'text-emerald-600 dark:text-emerald-500'
                    : 'text-gray-500 dark:text-gray-400'
              )}
            >
              {step.label}{' '}
              {step.sublabel && (
                <span className='hidden sm:inline-flex'>{step.sublabel}</span>
              )}
            </span>
          </div>
        );

        const body = onStepChange ? (
          <button
            type='button'
            className='group -m-2 block p-2 text-left'
            onClick={() => onStepChange(idx)}
            aria-current={isCurrent ? 'step' : undefined}
            aria-label={`${step.label}${step.sublabel ? ' ' + step.sublabel : ''}`}
          >
            {content}
          </button>
        ) : (
          <div
            aria-current={isCurrent ? 'step' : undefined}
            aria-label={`${step.label}${step.sublabel ? ' ' + step.sublabel : ''}`}
          >
            {content}
          </div>
        );

        const showRightLine = idx !== steps.length - 1;

        return (
          <li
            key={idx}
            className={classNames(
              'flex items-center sm:block',
              // show a horizontal line connector on sm+ between steps
              showRightLine &&
                "after:mx-6 after:hidden after:h-1 after:w-12 after:border-b after:border-gray-200 after:content-[''] dark:after:border-gray-700 sm:after:inline-block xl:after:mx-10"
            )}
          >
            {body}
          </li>
        );
      })}
    </ol>
  );
}
