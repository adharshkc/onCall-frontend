import React from 'react';

interface VisibilitySwitcherProps {
  isEnabled: boolean;
  onChange: (isEnabled: boolean) => void;
  label?: string;
}

const VisibilitySwitcher: React.FC<VisibilitySwitcherProps> = ({
  isEnabled,
  onChange,
  label = "Show on User Side:"
}) => {
  return (
    <div className="flex items-center gap-4">
      {label && (
        <span className="font-medium text-black dark:text-white">
          {label}
        </span>
      )}
      <label
        className={`relative m-0 block h-7.5 w-14 rounded-full ${
          isEnabled ? "bg-primary" : "bg-stroke dark:bg-strokedark"
        }`}
      >
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={(e) => onChange(e.target.checked)}
          className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`absolute left-[3px] top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
            isEnabled && "!right-[3px] !translate-x-full"
          }`}
        >
          <span className={isEnabled ? "hidden" : "inline-block"}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M13.2 2.80066C12.9331 2.53376 12.4669 2.53376 12.2 2.80066L8 7.00066L3.8 2.80066C3.53309 2.53376 3.06691 2.53376 2.8 2.80066C2.53309 3.06757 2.53309 3.53376 2.8 3.80066L7 8.00066L2.8 12.2007C2.53309 12.4676 2.53309 12.9337 2.8 13.2007C3.06691 13.4676 3.53309 13.4676 3.8 13.2007L8 9.00066L12.2 13.2007C12.4669 13.4676 12.9331 13.4676 13.2 13.2007C13.4669 12.9337 13.4669 12.4676 13.2 12.2007L9 8.00066L13.2 3.80066C13.4669 3.53376 13.4669 3.06757 13.2 2.80066Z"
                fill="#969AA1"
              />
            </svg>
          </span>
          <span className={isEnabled ? "inline-block" : "hidden"}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.59 12.41L2 7.82L3.41 6.41L6.59 9.59L12.59 3.59L14 5L6.59 12.41Z"
                fill="#969AA1"
              />
            </svg>
          </span>
        </span>
      </label>
    </div>
  );
};

export default VisibilitySwitcher;