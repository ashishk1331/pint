"use client";
import imageUrl from "../../images/family-tree.png";
import Image from "next/image";
import { useStore } from "../../lib/useStore.js";
import { twMerge } from "tailwind-merge";
import { forwardRef, useRef } from "react";
export default forwardRef(function Card(props, ref) {
  const gradient = useStore((state) => state.gradient);
  const shadow = useStore((state) => state.shadow);
  const frameGap = useStore((state) => state.frameGap);
  const radius = useStore((state) => state.radius);
  const imageURI = useStore((state) => state.imageURI);
  return (
    <div
      className="w-full relative aspect-video flex p-4 bg-primary/25"
      style={gradient}
      ref={ref}
    >
      <Image
        src={imageURI}
        width={420}
        height={420}
        priority={true}
        alt="family tree"
        className={twMerge(
          "m-auto rounded-md shadow-md",
          shadow === "sm" && "shadow-sm",
          shadow === "md" && "shadow-md",
          shadow === "lg" && "shadow-lg",
          shadow === "xl" && "shadow-xl",
          shadow === "2xl" && "shadow-2xl"
        )}
        style={{
          width: 100 - frameGap + "%",
          borderRadius: radius + "px",
        }}
      />
    </div>
  );
});
