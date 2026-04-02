import React from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

const BASE_CLASSNAME =
  "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10 box-border";

export default function PageContainer({
  children,
  as: Component = "div",
  className,
  style,
}: PageContainerProps) {
  return (
    <Component
      className={className ? `${BASE_CLASSNAME} ${className}` : BASE_CLASSNAME}
      style={style}
    >
      {children}
    </Component>
  );
}
