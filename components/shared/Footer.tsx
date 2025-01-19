"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Footer = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme("system");
  }, []);

  if (!mounted) return null;

  return (
    <footer className="text-sm border-t">
      <div className="container mx-auto py-4 px-6 flex gap-6 justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="font-thin">Whiteboard</span>
        </div>
        <div className="relative">
          <div className="flex items-center border rounded-full space-x-1">
            <button
              onClick={() => setTheme("system")}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                theme === "system" ? "border" : ""
              }`}
              aria-label="System Theme"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                theme === "light" ? "border" : ""
              }`}
              aria-label="Light Theme"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                theme === "dark" ? "border" : ""
              }`}
              aria-label="Dark Theme"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
