import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./SideBar";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex">
        <Sidebar className="flex-shrink-0" />
        <section className="flex-1 overflow-hidden p-4 pt-10 md:px-10 border-l">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default Layout;
