"use client";

import {
  useContext,
  useState,
  createContext,
  useRef,
  useEffect,
  LegacyRef,
} from "react";

type UIContextType = {
  isProfileOpen: boolean;
  setIsProfileOpen: (isOpen: boolean) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (isOpen: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  handleProfileClick: () => void;
  handleCartOpen: () => void;
  profileRef: LegacyRef<HTMLDivElement> | undefined;
  notificationRef: LegacyRef<HTMLDivElement> | undefined;
  cartRef: LegacyRef<HTMLDivElement> | undefined;
  profileIconRef: LegacyRef<HTMLDivElement> | undefined;
};

export const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const profileIconRef = useRef<HTMLDivElement | null>(null);
  const cartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isProfileOpen && !isCartOpen && !isNotificationOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        cartRef.current &&
        !cartRef.current.contains(event.target as Node)
      ) {
        closeAll();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, isCartOpen, isNotificationOpen]);

  const closeAll = () => {
    setIsProfileOpen(false);
    setIsNotificationOpen(false);
    setIsCartOpen(false);
  };

  const handleProfileClick = () => {
    if (isProfileOpen) {
      setIsProfileOpen(false);
    } else {
      closeAll();
      setIsProfileOpen(true);
    }
  };

  const handleCartOpen = () => {
    if (isCartOpen) {
      setIsCartOpen(false);
    } else {
      closeAll();
      setIsCartOpen(true);
    }
  };

  return (
    <UIContext.Provider
      value={{
        isCartOpen,
        isProfileOpen,
        isNotificationOpen,
        profileRef,
        notificationRef,
        cartRef,
        profileIconRef,
        setIsCartOpen,
        setIsProfileOpen,
        setIsNotificationOpen,
        handleProfileClick,
        handleCartOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

// هوك للاستخدام بسهولة
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIContextProvider");
  }
  return context;
};
