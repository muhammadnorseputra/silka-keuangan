"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal.Provider value={{ isOpen, setIsOpen }}>{children}</Modal.Provider>
  );
};

const useModalContext = () => {
  return useContext(ModalContext);
};

export { useModalContext };
export const Modal = ModalContext;
export default ModalProvider;
