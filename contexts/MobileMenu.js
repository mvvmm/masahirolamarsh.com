import { useContext, createContext, useState, useEffect } from "react";
import useScrollBlock from "../hooks/useScrollBlock";

const MobileMenuContext = createContext({});

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}

export function MobileMenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    isOpen ? blockScroll() : allowScroll();
  }, [isOpen]);
  const value = { isOpen, setIsOpen };

  return (
    <MobileMenuContext.Provider value={value}>
      {children}
    </MobileMenuContext.Provider>
  );
}
