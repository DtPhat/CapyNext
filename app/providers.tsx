"use client"
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from './lib/theme';




export const Providers = ({ children }: ContextProps) => {
  return (
    <ThemeProvider value={theme}>
      <LayoutProvider>
        <GoogleTranslationProvider>
          {children}
        </GoogleTranslationProvider>
      </LayoutProvider>
    </ThemeProvider>
  )
}

//Layout Context

export const LayoutContext = createContext<LayoutContextProps>({
  openSidebar: true,
  setOpenSidebar: () => { }
});
const LayoutProvider = ({ children }: ContextProps) => {
  const [openSidebar, setOpenSidebar] = useState(true)
  return (
    <LayoutContext.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
    </LayoutContext.Provider>
  )
}


//Google Translate Context

export const GoogleTranslationContext = createContext<GoogleTranslationContextProps>({
  text: "",
  setText: () => { }
});
const GoogleTranslationProvider = ({ children }: ContextProps) => {
  const [text, setText] = useState("")
  return (
    <GoogleTranslationContext.Provider value={{ text, setText }}>
      {children}
    </GoogleTranslationContext.Provider>
  )
}


//Interface settings

interface LayoutContextProps {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

interface GoogleTranslationContextProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

interface ContextProps {
  children: ReactNode
}

interface GoogleTranslationContextProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

interface ContextProps {
  children: ReactNode
}