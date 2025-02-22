"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { Toaster } from "react-hot-toast";
import TopLoader from "./toploader";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" {...props}>
      <TopLoader />
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          removeDelay: 2500,
        }}
        
      />
    </NextThemesProvider>
  );
}
