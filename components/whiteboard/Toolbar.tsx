"use client";

import { Eraser, Pencil } from "lucide-react";
import React from "react";

type Tool = "pen" | "eraser";

interface ToolbarProps {
  currentTool: Tool;
  setTool: (tool: Tool) => void;
  setColor: (color: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  currentTool,
  setTool,
  setColor,
}) => {
  return (
    <div className="flex items-center space-x-2 border my-4 p-2 rounded w-fit">
      <button
        onClick={() => setTool("pen")}
        className={`rounded p-2 ${
          currentTool === "pen" ? "bg-zinc-500" : ""
        } transition-colors duration-200 ease-in-out`}
      >
        <Pencil size={14} />
      </button>
      <button
        onClick={() => setTool("eraser")}
        className={`rounded p-2 ${
          currentTool === "eraser" ? "bg-zinc-500" : ""
        } transition-colors duration-200 ease-in-out`}
      >
        <Eraser size={14} />
      </button>
      <input
        type="color"
        onChange={(e) => setColor(e.target.value)}
        className="w-6 h-6 rounded"
      />
    </div>
  );
};

export default Toolbar;
