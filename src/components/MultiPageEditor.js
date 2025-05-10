import React, { useState } from 'react';
import A4Canvas from './A4Canvas';
import ShapeTools from './ShapeTools';

const MultiPageEditor = () => {
  const [pages, setPages] = useState([1]); // Start with one page
  const [tool, setTool] = useState('select');

  const addPage = () => {
    setPages((prev) => [...prev, prev.length + 1]); // Add a new page
  };

  return (
    <div className="p-4">
      <ShapeTools setTool={setTool} />
      <div>
        {pages.map((page, index) => (
          <div key={index} className="flex justify-center my-10">
            <A4Canvas id={`canvas-${index}`} tool={tool} />
          </div>
        ))}
      </div>
      <div className="editor-canvas-add-btn" >
      <button  onClick={addPage} >+ Add Page</button>
      </div>
    </div>
  );
};

export default MultiPageEditor;
