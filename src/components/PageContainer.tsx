"use client";

import React from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_STYLE: CSSProperties = {
  width: "100%",
  maxWidth: 1440,
  margin: "0 auto",
  paddingBlock: 0,
  paddingInline: 24,
};

export default function PageContainer({
  children,
  as: Component = "div",
  className,
  style,
}: PageContainerProps) {
  return (
    <Component className={className} style={{ ...DEFAULT_STYLE, ...style }}>
      {children}
    </Component>
  );
}
