
import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import "./Header.css";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="header dark:header">
      <div className="header-container">
        <div className="header-left">
          {/* Hamburger Toggle BTN */}
          {!props.sidebarOpen && (
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                props.setSidebarOpen(true);
              }}
              className="hamburger-button dark:hamburger-button"
            >
              <span className="hamburger-icon">
                {/* First group: Horizontal lines for hamburger icon */}
                <span className="hamburger-lines-container">
                  <span
                    className={`hamburger-line dark:hamburger-line ${
                      props.sidebarOpen ? "hidden" : ""
                    }`}
                  ></span>
                  <span
                    className={`hamburger-line dark:hamburger-line ${
                      props.sidebarOpen ? "hidden" : ""
                    }`}
                  ></span>
                  <span
                    className={`hamburger-line dark:hamburger-line ${
                      props.sidebarOpen ? "hidden" : ""
                    }`}
                  ></span>
                </span>

                {/* Second group: Cross icon (rotated 45 degrees) */}
                <span className="cross-container">
                  <span
                    className={`cross-vertical dark:cross-vertical ${
                      props.sidebarOpen ? "" : "cross-hidden"
                    }`}
                  ></span>
                  <span
                    className={`cross-horizontal dark:cross-horizontal ${
                      props.sidebarOpen ? "" : "cross-hidden"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
          )}
          {/* <!-- Hamburger Toggle BTN --> */}

          {!props.sidebarOpen && (
            <Link className="logo-link" href="/admin/dashboard">
              {/* <Image
                width={32}
                height={32}
                src={"/images/logo/logo-icon.svg"}
                alt="Logo"
              /> */}
            </Link>
          )}
        </div>

        <div className="header-right">
          <ul className="header-menu">
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;