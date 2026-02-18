"use client";

import { ReactNode } from "react";

interface ClientShellProps {
  children: ReactNode;
}

export default function ClientShell({ children }: ClientShellProps) {
  return <>{children}</>;
}
