import Image from 'next/image';

interface BrandLogoProps {
  dark?: boolean;
  variant?: 'mark' | 'full';
  className?: string;
}

export default function BrandLogo({
  dark = false,
  variant = 'mark',
  className = '',
}: BrandLogoProps) {
  const isFull = variant === 'full';
  const src = isFull ? '/brand/dxw-logo-full.png' : '/brand/dxw-logo-mark.png';
  const width = isFull ? 1035 : 891;
  const height = isFull ? 711 : 484;

  if (dark) {
    return (
      <span
        className={`relative inline-flex items-center justify-center rounded-md bg-white p-2.5 shadow-sm transition-opacity hover:opacity-95 ${
          isFull ? 'h-20 w-auto' : 'h-14 md:h-16 w-auto'
        } ${className}`}
      >
        <Image
          src={src}
          alt="D X W CONSTRUCTION L.L.C."
          width={width}
          height={height}
          priority
          className="h-full w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex items-center ${
        isFull ? 'h-16 md:h-18' : 'h-12 md:h-14'
      } ${className}`}
    >
      <Image
        src={src}
        alt="D X W CONSTRUCTION L.L.C."
        width={width}
        height={height}
        priority
        className="h-full w-auto object-contain"
      />
    </span>
  );
}
