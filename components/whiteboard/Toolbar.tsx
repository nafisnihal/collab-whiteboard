"use client";

import { Eraser, Pencil } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

type Tool = "pen" | "eraser";

interface ToolbarProps {
  currentTool: Tool;
  setTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  currentTool,
  setTool,
  color,
  setColor,
}) => {
  const colorPickerRef = useRef<any>(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<any>(false);

  const handleClickOutside = (event: any) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef?.current?.contains(event?.target)
    ) {
      setIsColorPickerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center space-x-2 border my-4 p-2 rounded w-fit relative">
      <button
        onClick={() => setTool("pen")}
        className={`rounded p-2 ${
          currentTool === "pen" ? "bg-zinc-800" : ""
        } transition-colors duration-200 ease-in-out`}
      >
        <Pencil size={14} />
      </button>
      <button
        onClick={() => setTool("eraser")}
        className={`rounded p-2 ${
          currentTool === "eraser" ? "bg-zinc-800" : ""
        } transition-colors duration-200 ease-in-out`}
      >
        <Eraser size={14} />
      </button>
      <button
        className={`w-6 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out`}
        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
        style={{ backgroundColor: color }}
        disabled={currentTool === "eraser"}
      />
      <div ref={colorPickerRef}>
        {currentTool === "pen" && isColorPickerOpen && (
          <div className="absolute top-full left-full rounded shadow-lg">
            <HexColorPicker
              color={color}
              onChange={(color) => setColor(color)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
