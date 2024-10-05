"use client";

import { useEffect, useRef } from "react";
import Konva from "konva";
import { Layer, Stage } from "react-konva";

export function Canvas() {
  const canvasRef = useRef<Konva.Stage | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      console.log({ parent: canvasRef.current });
      console.log();
      /* const width = canvasRef.current.parent?.width() ?? 800;
      const height = canvasRef.current.parent?.height() ?? 600;

      canvasRef.current.width(width);
      canvasRef.current.height(height); */
    }
  }, []);
  return (
    <Stage ref={canvasRef} className="h-full w-full">
      <Layer className=""></Layer>
    </Stage>
  );
}
