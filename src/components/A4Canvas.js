import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { createLaTeXObject } from '../utils/latexUtils';

const A4Canvas = ({ id, tool }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait a short delay to ensure the canvas is in the DOM
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 50); // 50ms delay is usually enough

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady || !canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 595,
      height: 842,
      backgroundColor: '#fff',
    });

    fabricCanvasRef.current = canvas;

    createLaTeXObject(canvas, '\\frac{E}{mc^2}', {
      left: 100,
      top: 100,
      fontSize: 24,
    });

    return () => {
      canvas.dispose();
    };
  }, [isReady]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    let isDrawing = false;
    let shape;

    const startDrawing = (opt) => {
      if (tool === 'select') return;
      isDrawing = true;
      const pointer = canvas.getPointer(opt.e);

      switch (tool) {
        case 'rectangle':
          shape = new fabric.Rect({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            fill: 'rgba(0,0,0,0.1)',
            stroke: '#000',
            strokeWidth: 1,
          });
          break;
        case 'circle':
          shape = new fabric.Circle({
            left: pointer.x,
            top: pointer.y,
            radius: 0,
            fill: 'rgba(0,0,0,0.1)',
            stroke: '#000',
            strokeWidth: 1,
            originX: 'center',
            originY: 'center',
          });
          break;
        case 'line':
          shape = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
            stroke: '#000',
            strokeWidth: 2,
          });
          break;
        default:
          break;
      }

      if (shape) {
        canvas.add(shape);
      }
    };

    const draw = (opt) => {
      if (!isDrawing || !shape) return;
      const pointer = canvas.getPointer(opt.e);

      if (tool === 'rectangle') {
        shape.set({
          width: pointer.x - shape.left,
          height: pointer.y - shape.top,
        });
      } else if (tool === 'circle') {
        const radius = Math.sqrt(
          Math.pow(pointer.x - shape.left, 2) +
          Math.pow(pointer.y - shape.top, 2)
        );
        shape.set({ radius });
      } else if (tool === 'line') {
        shape.set({ x2: pointer.x, y2: pointer.y });
      }

      canvas.renderAll();
    };

    const endDrawing = () => {
      isDrawing = false;
      shape = null;
    };

    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    canvas.on('mouse:down', startDrawing);
    canvas.on('mouse:move', draw);
    canvas.on('mouse:up', endDrawing);
  }, [tool, isReady]);

  return <canvas ref={canvasRef} id={id} className="border my-10" />;
};

export default A4Canvas;
