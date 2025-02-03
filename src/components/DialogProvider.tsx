'use client';

import { createContext, useContext, useState, ReactNode, useRef } from 'react';

type DialogContextType = {
  showDialog: (content: ReactNode) => void;
  closeDialog: (e: React.MouseEvent<HTMLDialogElement>) => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const showDialog = (newContent: ReactNode) => {
    setContent(newContent);
    dialogRef.current?.showModal();
  };

  const closeDialog = (e: React.MouseEvent<HTMLDialogElement>) => {
    e.stopPropagation()
    dialogRef.current?.close()
  };

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}

      {/* Global Dialog */}
      <dialog ref={dialogRef} onClick={closeDialog} title="Close">
        {content}
      </dialog>
    </DialogContext.Provider>
  );
}

// Hook for easy access
export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error('useDialog must be used within a DialogProvider');
  return context;
}
