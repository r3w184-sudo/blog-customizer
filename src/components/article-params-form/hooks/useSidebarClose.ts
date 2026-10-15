import { useEffect } from 'react';

import type * as React from 'react';

type UseSidebarClose = {
  isOpen: boolean;
  onClose: () => void;
  rootRef: React.RefObject<HTMLElement | null>;
};

export const useSidebarClose = ({ isOpen, onClose, rootRef }: UseSidebarClose): void => {
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (event: MouseEvent): void => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('keydown', handleKeyDown);

    return (): void => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, rootRef]);
};
