"use client";

import React, { useEffect, useRef, useState } from "react";
import Toolbar from "./Toolbar";

// The Canvas component where drawing occurs.
const Canvas = () => {
  // Refs to access the canvas element.
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States to manage drawing and tool behavior.
  const [isDrawing, setIsDrawing] = useState(false); // Tracks if drawing is in progress.
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null); // The 2D drawing context.
  const [tool, setTool] = useState<"pen" | "eraser">("pen"); // Tracks current tool: pen or eraser.
  const [color, setColor] = useState("black"); // Tracks the color selected for drawing.

  // This effect initializes the canvas context when the component mounts.
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // If the context is available, we set it up for drawing.
      if (ctx) {
        setContext(ctx);
        // Adjust canvas size based on device pixel ratio for better scaling.
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio); // Scale drawing according to device pixel ratio.

        // Set drawing defaults like line cap style.
        ctx.lineCap = "round";

        // Set up the drawing settings based on the current tool.
        updateToolSettings(ctx);
      }
    }
  }, []);

  // This effect updates the drawing settings whenever the tool or color changes.
  useEffect(() => {
    if (context) {
      updateToolSettings(context);
    }
  }, [color, tool]);

  // A helper function to update drawing settings based on the selected tool.
  const updateToolSettings = (ctx: CanvasRenderingContext2D) => {
    if (tool === "pen") {
      // For pen, draw normally.
      ctx.globalCompositeOperation = "source-over"; // Draw normally (overwrite).
      ctx.strokeStyle = color; // Set stroke color to selected color.
      ctx.lineWidth = 2; // Set pen line width.
    } else if (tool === "eraser") {
      // For eraser, erase content.
      ctx.globalCompositeOperation = "destination-out"; // Erase content.
      ctx.lineWidth = 10; // Set eraser size.
    }
  };

  // Function that starts drawing when the mouse is pressed down.
  const startDrawing = (e: React.MouseEvent) => {
    if (context) {
      const rect = canvasRef.current?.getBoundingClientRect();

      // Calculate the mouse position relative to the canvas for accurate drawing.
      if (rect) {
        context.beginPath();
        context.moveTo(
          (e.clientX - rect.left) * window.devicePixelRatio,
          (e.clientY - rect.top) * window.devicePixelRatio
        );
      }

      setIsDrawing(true); // Set drawing state to true when the mouse is pressed.
    }
  };

  // Function that draws when the mouse moves, provided drawing is active.
  const draw = (e: React.MouseEvent) => {
    if (isDrawing && context) {
      const rect = canvasRef.current?.getBoundingClientRect();

      // If drawing is active and the mouse moves, continue drawing.
      if (rect) {
        context.lineTo(
          (e.clientX - rect.left) * window.devicePixelRatio,
          (e.clientY - rect.top) * window.devicePixelRatio
        );
        context.stroke(); // Apply the stroke (draw on the canvas).
      }
    }
  };

  // Function to stop drawing when the mouse button is released or leaves the canvas.
  const stopDrawing = () => {
    if (isDrawing) {
      context?.closePath(); // Close the current path.
      setIsDrawing(false); // Reset drawing state.
    }
  };

  return (
    <div className="relative">
      {/* Render the Toolbar component that controls the drawing tool and color */}
      <Toolbar currentTool={tool} setTool={setTool} setColor={setColor} />

      {/* The canvas element where the drawing happens */}
      <canvas
        ref={canvasRef}
        className="border"
        style={{ width: "800px", height: "600px" }} // Fixed canvas size
        onMouseDown={startDrawing} // Start drawing when mouse is pressed.
        onMouseMove={draw} // Draw as the mouse moves.
        onMouseUp={stopDrawing} // Stop drawing when mouse is released.
        onMouseLeave={stopDrawing} // Stop drawing if mouse leaves the canvas.
      />
    </div>
  );
};

export default Canvas;
