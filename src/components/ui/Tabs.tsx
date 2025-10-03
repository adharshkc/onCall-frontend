"use client";
import React, { useState } from "react";
import "./Tabs.css";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  contentClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveTab,
  className = "",
  tabClassName = "",
  activeTabClassName = "",
  inactiveTabClassName = "",
  contentClassName = "",
}) => {
  const [activeTab, setActiveTab] = useState(
    defaultActiveTab || tabs[0]?.id || ""
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={`w-full tab-container ${className}`}>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <nav className="flex space-x-0 px-1" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  tab-button px-6 py-4 text-sm font-medium transition-all duration-200 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                  ${tabClassName}
                  ${isActive ? `active ${activeTabClassName}` : `${inactiveTabClassName}`}
                `}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className={`tab-content p-0 bg-transparent border-none ${contentClassName}`}>
        {activeTabContent}
      </div>
    </div>
  );
};

export default Tabs;
