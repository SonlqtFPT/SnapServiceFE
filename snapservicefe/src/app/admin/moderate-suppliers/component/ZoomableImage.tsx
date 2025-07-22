'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
};

export default function ZoomableImage({ src, alt }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={80}
        height={50}
        className="rounded border object-cover cursor-pointer w-20 h-15"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-[90vw] h-[90vh] max-w-3xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain rounded"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
