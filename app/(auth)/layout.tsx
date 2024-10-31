// components/Layout.js
'use client'
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
<>
      <main className="flex flex-col min-h-screen bg-slate-950">
      <Navbar />
        {children}
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2024 Your Company</p>
      </footer>
      </>
  );
};

export default Layout;
