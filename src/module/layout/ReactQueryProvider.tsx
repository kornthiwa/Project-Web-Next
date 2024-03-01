"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const querylient = new QueryClient();

export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <QueryClientProvider client={querylient}>{children}</QueryClientProvider>;
