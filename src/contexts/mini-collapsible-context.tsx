import { createContext, useContext, useState } from "react";

const MiniCollapsibleContext = createContext<{
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
} | undefined>(undefined);

export function MiniCollapsibleProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <MiniCollapsibleContext.Provider value={{ open, setOpen }}>
      {children}
    </MiniCollapsibleContext.Provider>
  );
}

export function useMiniCollapsible() {
  const context = useContext(MiniCollapsibleContext);
  if (!context) {
    throw new Error();
  }

  return context;
}
