import { usePathname } from 'next/navigation';
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
export const DisplayContext = createContext<DisplayContextProps>({
  openSidebar: false,
  setOpenSidebar: () => { }
});
export const DisplayProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  useEffect(() => {
    if (pathname == '/') {
      setOpenSidebar(false)
    }
  }, []);
  const [openSidebar, setOpenSidebar] = useState(true)
  return (
    <DisplayContext.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
    </DisplayContext.Provider>
  )
}


interface DisplayContextProps {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}
