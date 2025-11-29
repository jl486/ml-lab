import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  invert?: boolean;
}

export function Image({ src, invert, className, ...props }: ImageProps) {
  return (
    <img
      src={src}
      className={cn("select-none flex justify-center items-center rounded-md", invert ? "dark:invert" : "dark:brightness-75", className)}
      {...props}
    />
  );
}
