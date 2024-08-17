"use client";

import { createContext, useContext, useState } from "react";

const SpinnerContext = createContext();

const SpinnerProvider = ({ children }) => {
  const [isSpinner, setIsSpinner] = useState(false);

  return (
    <Spinner.Provider value={{ isSpinner, setIsSpinner }}>
      {children}
    </Spinner.Provider>
  );
};

const useSpinnerContext = () => {
  return useContext(SpinnerContext);
};

export { useSpinnerContext };
export const Spinner = SpinnerContext;
export default SpinnerProvider;
