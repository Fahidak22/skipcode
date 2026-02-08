"use client";

import { useRef, useState, useEffect } from "react";

export default function WhiteboardOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);   // tools active (pen or eraser)
  const [isPainting, setIsPainting] = useState(false); // mouse pressed
  const [color, setColor] = useState("#FFFF00");
  const [isEraser, setIsEraser] = useState(false);     // false = pen, true = eraser
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);

  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // for eraser preview circle
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const eraserSize = 20; // same as eraser lineWidth

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 1200;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
      }

      saveToHistory();
    }
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (isEraser) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = eraserSize;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
    }
  }, [color, isEraser]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const newHistory = history.slice(0, historyStep + 1);
      newHistory.push(imageData);
      setHistory(newHistory);
      setHistoryStep(newHistory.length - 1);
    }
  };

  const undo = () => {
    if (historyStep > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        const newStep = historyStep - 1;
        ctx.putImageData(history[newStep], 0, 0);
        setHistoryStep(newStep);
      }
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        const newStep = historyStep + 1;
        ctx.putImageData(history[newStep], 0, 0);
        setHistoryStep(newStep);
      }
    }
  };

  const getPos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startPaint = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    // right click: stop tools
    if (e.button === 2) {
      stopAllTools();
      return;
    }

    const pos = getPos(e);
    if (!pos) return;

    setIsPainting(true);
    lastPos.current = pos;

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }
  };

  const endPaint = () => {
    if (!isPainting) return;
    setIsPainting(false);
    lastPos.current = null;

    const ctx = canvasRef.current?.getContext("2d");
    ctx?.closePath();
    saveToHistory();
  };

  const draw = (e: React.MouseEvent) => {
    if (!isPainting || !isDrawing) return;

    const pos = getPos(e);
    const prev = lastPos.current;
    const ctx = canvasRef.current?.getContext("2d");
    if (!pos || !prev || !ctx) return;

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPos.current = pos;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      saveToHistory();
    }
  };

  const stopAllTools = () => {
    setIsDrawing(false);
    setIsPainting(false);
    setIsEraser(false);
    lastPos.current = null;
    setCursorPos(null);
  };

  // Pen: toggle on/off
  const handlePenClick = () => {
    if (isDrawing && !isEraser) {
      // pen already active -> second click turns everything off
      stopAllTools();
    } else {
      // activate pen
      setIsDrawing(true);
      setIsEraser(false);
      setCursorPos(null); // let crosshair be the only cursor
    }
  };

  // Eraser: toggle on/off
  const handleEraserClick = () => {
    if (isDrawing && isEraser) {
      // eraser already active -> second click turns everything off
      stopAllTools();
    } else {
      // activate eraser
      setIsDrawing(true);
      setIsEraser(true);
    }
  };

  const toolsVisible = isDrawing; // pen or eraser active

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    if (pos) setCursorPos(pos);
    draw(e);
  };

  const handleCanvasLeave = () => {
    endPaint();
    setCursorPos(null);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-black/80 p-2 rounded-lg border border-gray-700 shadow-xl backdrop-blur-sm">
        {/* Pen (toggle) */}
        <button
          onClick={handlePenClick}
          className={`w-8 h-8 flex items-center justify-center rounded text-lg font-bold ${
            isDrawing && !isEraser
              ? "bg-green-500 text-black"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
          title="Pen"
        >
          ✏️
        </button>

        {/* Eraser (toggle) */}
        <button
          onClick={handleEraserClick}
          className={`w-8 h-8 flex items-center justify-center rounded text-lg font-bold ${
            isDrawing && isEraser
              ? "bg-purple-500 text-white"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
          title="Eraser"
        >
          🧹
        </button>

        {/* Colors – only when pen is active */}
        {toolsVisible && !isEraser && (
          <div className="flex gap-1 items-center bg-gray-800 rounded px-2 py-1">
            <button
              onClick={() => setColor("#FFFF00")}
              className={`w-4 h-4 rounded-full bg-yellow-400 border border-gray-600 ${
                color === "#FFFF00" ? "ring-2 ring-white" : ""
              }`}
            />
            <button
              onClick={() => setColor("#FF0000")}
              className={`w-4 h-4 rounded-full bg-red-500 border border-gray-600 ${
                color === "#FF0000" ? "ring-2 ring-white" : ""
              }`}
            />
            <button
              onClick={() => setColor("#00FF00")}
              className={`w-4 h-4 rounded-full bg-green-500 border border-gray-600 ${
                color === "#00FF00" ? "ring-2 ring-white" : ""
              }`}
            />
            <button
              onClick={() => setColor("#0000FF")}
              className={`w-4 h-4 rounded-full bg-blue-500 border border-gray-600 ${
                color === "#0000FF" ? "ring-2 ring-white" : ""
              }`}
            />
            <button
              onClick={() => setColor("#FFFFFF")}
              className={`w-4 h-4 rounded-full bg-white border border-gray-600 ${
                color === "#FFFFFF" ? "ring-2 ring-white" : ""
              }`}
            />
            <button
              onClick={() => setColor("#000000")}
              className={`w-4 h-4 rounded-full bg-black border border-gray-400 ${
                color === "#000000" ? "ring-2 ring-white" : ""
              }`}
            />
          </div>
        )}

        {/* Extra controls – only when toolsVisible */}
        {toolsVisible && (
          <>
            {/* Undo */}
            <button
              onClick={undo}
              disabled={historyStep <= 0}
              className={`w-8 h-8 flex items-center justify-center rounded text-lg ${
                historyStep > 0
                  ? "bg-blue-900/60 hover:bg-blue-900 text-blue-200"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
              title="Undo"
            >
              ↶
            </button>

            {/* Redo */}
            <button
              onClick={redo}
              disabled={historyStep >= history.length - 1}
              className={`w-8 h-8 flex items-center justify-center rounded text-lg ${
                historyStep < history.length - 1
                  ? "bg-blue-900/60 hover:bg-blue-900 text-blue-200"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
              title="Redo"
            >
              ↷
            </button>

            {/* Stop */}
            <button
              onClick={stopAllTools}
              className="px-2 h-8 flex items-center justify-center rounded text-xs font-semibold bg-orange-900/60 hover:bg-orange-900 text-orange-200"
            >
              Stop
            </button>

            {/* Clear (eraser icon style) */}
            <button
              onClick={clearCanvas}
              className="px-2 h-8 flex items-center justify-center rounded text-lg bg-red-900/60 hover:bg-red-900 text-red-200"
              title="Clear"
            >
              ⌫
            </button>
          </>
        )}
      </div>

      {/* Eraser preview circle */}
      {isDrawing && isEraser && cursorPos && (
        <div
          className="pointer-events-none absolute z-50 rounded-full border-2 border-white/80"
          style={{
            width: eraserSize,
            height: eraserSize,
            left: cursorPos.x - eraserSize / 2,
            top: cursorPos.y - eraserSize / 2,
          }}
        />
      )}

      <canvas
        ref={canvasRef}
        onMouseDown={startPaint}
        onMouseUp={endPaint}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={handleCanvasLeave}
        onContextMenu={(e) => {
          e.preventDefault();
          stopAllTools();
        }}
        className={`absolute top-0 left-0 w-full h-full z-40 ${
          isDrawing
            ? isEraser
              ? "cursor-none pointer-events-auto"      // eraser: hide system cursor, show circle
              : "cursor-crosshair pointer-events-auto"  // pen: crosshair target
            : "pointer-events-none"
        }`}
      />
    </>
  );
}
