// src/components/ui/avatar-image.tsx
import * as React from "react";
import Image from "next/image"; // Sử dụng Image của Next.js

// Loại bỏ 'alt' và 'src' khỏi các props gốc của Image trước khi extend,
// sau đó định nghĩa lại chúng là tùy chọn trong AvatarImageProps.
interface AvatarImageProps extends Omit<React.ComponentPropsWithoutRef<typeof Image>, 'alt' | 'src'> {
  src?: string; // Định nghĩa lại src là tùy chọn (nếu bạn muốn nó là tùy chọn)
  alt?: string; // Định nghĩa lại alt là tùy chọn
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, ...props }, ref) => (
    <Image
      ref={ref}
      src={src || "/placeholder.svg"} // Cung cấp giá trị dự phòng cho src nếu nó undefined
      alt={alt || "Avatar"} // Cung cấp giá trị dự phòng cho alt nếu nó undefined, đảm bảo luôn là string
      width={props.width || 40} // Default width/height, adjust as needed
      height={props.height || 40}
      className={"aspect-square h-full w-full object-cover " + className}
      {...props}
    />
  )
);
AvatarImage.displayName = "AvatarImage";

export { AvatarImage };