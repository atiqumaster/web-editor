import React from 'react';

const ShapeTools = ({ setTool }) => (
  <div className="flex gap-2 p-2 tfu-shape-tools-btn">
    <button onClick={() => setTool('select')}>Select</button>
    <button onClick={() => setTool('rectangle')}>Rectangle</button>
    <button onClick={() => setTool('circle')}>Circle</button>
    <button onClick={() => setTool('line')}>Line</button>
  </div>
);

export default ShapeTools;
