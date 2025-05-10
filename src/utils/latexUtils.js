import katex from 'katex';
import 'katex/dist/katex.min.css';
import { fabric } from 'fabric';

function toBase64Unicode(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

export const renderLaTeXToHTML = (latex, options = {}) => {
  try {
    return katex.renderToString(latex, { ...options, output: 'html' });
  } catch (error) {
    return '<span style="color: red;">Invalid LaTeX</span>';
  }
};

export const createLaTeXObject = (canvas, latex, options = {}) => {
  const html = renderLaTeXToHTML(latex, options);
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="80">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:${options.fontSize || 20}px">
          ${html}
        </div>
      </foreignObject>
    </svg>
  `;
  const base64 = toBase64Unicode(svgString);
  const dataUrl = `data:image/svg+xml;base64,${base64}`;

  fabric.Image.fromURL(dataUrl, (img) => {
    img.set({
      left: options.left || 50,
      top: options.top || 50,
      selectable: true,
      hasControls: true,
      latex,
    });

    img.on('mousedblclick', () => {
      const newLatex = prompt('Edit LaTeX:', img.latex);
      if (newLatex !== null) {
        createLaTeXObject(canvas, newLatex, {
          left: img.left,
          top: img.top,
          fontSize: options.fontSize,
        });
        canvas.remove(img);
      }
    });

    canvas.add(img);
  });
};
