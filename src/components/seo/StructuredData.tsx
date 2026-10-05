import React from 'react';

interface StructuredDataProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Server component that safely renders JSON-LD structured data.
 * Escapes characters to prevent XSS.
 */
export default function StructuredData({ data }: StructuredDataProps) {
  const jsonString = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
