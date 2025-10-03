import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();

  return (
    <>
      <ul className="sidebar-dropdown-list">
        {item.map((item: any, index: number) => (
          <li key={index} className="sidebar-dropdown-item">
            <Link
              href={item.route}
              className={`sidebar-dropdown-link ${
                pathname === item.route ? "active" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarDropdown;
