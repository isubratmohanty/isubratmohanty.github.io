export default function Logo({ className, size = 28 }) {
  return (
    <img
      className={className}
      src="/sm-logo-nav.png"
      alt="SM"
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
      aria-hidden
    />
  );
}
