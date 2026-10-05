'use client';

import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  label: string;
}

export default function BackToTop({ label }: BackToTopProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      className="group inline-flex min-h-10 items-center gap-2 rounded border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-white/85 backdrop-blur-sm transition-all hover:border-accent hover:bg-white/10 hover:text-white focus-visible:outline-white"
    >
      <span>{label}</span>
      <ArrowUp
        className="size-3.5 text-accent transition-transform duration-200 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </button>
  );
}
