"use client";
import * as React from "react";

export const useSelectedTab = ({ defaultKey: key }) => {
  const tab =
    typeof window !== "undefined" ? window.localStorage.getItem("tab") : key;
  const [isTab, setIsTab] = React.useState(tab);

  const handleTabChange = (key) => {
    setIsTab(key);
    localStorage.setItem("tab", key);
  };

  React.useEffect(() => {
    handleTabChange(isTab);
  }, [isTab]);

  return {
    handleTabChange,
    isTab,
  };
};
