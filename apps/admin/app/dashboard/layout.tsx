// import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/sidebar";
import dynamic from "next/dynamic";
import React from "react";
const SidebarDynamic = dynamic(() => import("@/components/sidebar/sidebar"), {
  ssr: false,
});
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <SidebarDynamic />
      <div className="fixed"></div>
      <div className="grow overflow-y-auto">
        {/* <Header /> */}
        {children}
      </div>
    </div>
  );
};

export default layout;
