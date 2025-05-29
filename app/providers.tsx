"use client"
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from '../lib/theme';
import { AuthProvider } from '@/providers/auth';
import { DisplayProvider } from '@/providers/display';
import SWRProvider from '@/providers/swr';
import { StripeProvider } from '@/providers/stripe';


export const Providers = ({ children }: ContextProps) => {
  return (
    <ThemeProvider value={theme}>
      {/* <StripeProvider> */}
        <AuthProvider>
          <DisplayProvider>
            <SWRProvider>
              {children}
            </SWRProvider>
          </DisplayProvider>
        </AuthProvider>
      {/* </StripeProvider> */}
    </ThemeProvider>
  )
}


interface ContextProps {
  children: ReactNode
}

