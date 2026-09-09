import React, { useState, useEffect } from 'react';
import { getAssetUrl } from '../utils/asset';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  basePath: string; // The base path without the extension, e.g. "images/tch"
  extensions?: string[]; // The list of extensions to try in sequence
  alt?: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export default function FallbackImage({
  basePath,
  extensions = ['png', 'jpg', 'jpeg', 'svg', 'webp'],
  alt,
  className,
  ...props
}: FallbackImageProps) {
  const [extIndex, setExtIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(() => getAssetUrl(`${basePath}.${extensions[0]}`));

  // When basePath or extensions array changes, reset starting with the first extension
  useEffect(() => {
    setExtIndex(0);
    setImgSrc(getAssetUrl(`${basePath}.${extensions[0]}`));
  }, [basePath, extensions]);

  const handleError = () => {
    if (extIndex + 1 < extensions.length) {
      const nextIndex = extIndex + 1;
      setExtIndex(nextIndex);
      setImgSrc(getAssetUrl(`${basePath}.${extensions[nextIndex]}`));
    }
  };

  if (!imgSrc) {
    return null;
  }

  return (
    <img
      src={imgSrc || undefined}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
