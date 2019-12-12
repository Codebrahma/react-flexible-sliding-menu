import React, { useContext } from 'react';
import { MenuContext } from '../../src';

const App = () => {
  const { toggleMenu } = useContext(MenuContext);

  return (
    <div
      style={{
        background: 'lightgray',
        padding: '1rem'
      }}
    >
      <h1>App</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
        eligendi provident. Aliquid nisi ducimus dignissimos nulla nemo
        excepturi rerum blanditiis, omnis pariatur doloremque! Cupiditate fugit
        numquam sapiente at nam incidunt.
      </p>
      <button
        type="button"
        onClick={toggleMenu}
        style={{
          background: '#1F68FA',
          color: '#fff',
          border: 0,
          padding: '0 1rem'
        }}
      >
        <h3>Toggle Menu</h3>
      </button>
    </div>
  );
};

export default App;
