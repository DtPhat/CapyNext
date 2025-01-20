"use client"
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from '../lib/theme';
import { AuthProvider } from '@/providers/auth';
import { DisplayProvider } from '@/providers/display';
import SWRProvider from '@/providers/swr';


export const Providers = ({ children }: ContextProps) => {
  return (

    <ThemeProvider value={theme}>
      <AuthProvider>
        <DisplayProvider>
          <SWRProvider>
            {children}
          </SWRProvider>
        </DisplayProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}


interface ContextProps {
  children: ReactNode
}

