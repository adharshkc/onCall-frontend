// DefaultLayout.tsx
"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import styles from "./DefaultLayout.module.css";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      {/* Page Wrapper */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content Area */}
        <div
          className={`${styles.contentArea} ${
            sidebarOpen
              ? styles.contentAreaSidebarOpen
              : styles.contentAreaSidebarClosed
          }`}
        >
          {/* Header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main Content */}
          <main className={styles.mainContent}>{children}</main>
        </div>
      </div>
    </>
  );
}