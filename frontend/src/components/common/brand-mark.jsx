/**
 * BrandMark renders the EternityVerse infinity mark without a background box.
 */
export function BrandMark({ className = 'h-9 w-9' }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
        <path
          d="M18.5 40.5C9.5 40.5 8 23.5 18.5 23.5C26 23.5 31.5 40.5 45.5 40.5C55.5 40.5 56 23.5 45.5 23.5C38 23.5 32.5 40.5 18.5 40.5Z"
          fill="none"
          stroke="#d7e2e8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <path
          d="M23 32H41"
          fill="none"
          stroke="rgb(172 126 231)"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
    </span>
  );
}
