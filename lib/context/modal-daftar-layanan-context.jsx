"use client";

import { createContext, useContext, useState } from "react";

const ModalDaftarLayananContext = createContext(null);

const ModalDaftarLayananProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [jenis, setJenis] = useState(null);

  return (
    <Modal.Provider
      value={{ isOpen, setIsOpen, data, setData, jenis, setJenis }}>
      {children}
    </Modal.Provider>
  );
};

const useModalDaftarLayananContext = () => {
  return useContext(ModalDaftarLayananContext);
};

export { useModalDaftarLayananContext };
export const Modal = ModalDaftarLayananContext;
export default ModalDaftarLayananProvider;
