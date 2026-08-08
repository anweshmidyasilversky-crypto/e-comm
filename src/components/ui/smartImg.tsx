import { useState } from "react";
import { Skeleton } from "./skeleton";

type SmartImageProps = {
  src: string;
  alt?: string;
  fallbackSrc?: string;
  className?: string;
};

export default function SmartImage({
  src,
  alt,
  fallbackSrc,
  className = "",
}: SmartImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative overflow-hidden w-full h-full flex justify-center">
      {/* Tailwind Skeleton Loader */}
      {isLoading && <Skeleton className="h-[400px] w-[400px]" />}

      {/* Main Image */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
