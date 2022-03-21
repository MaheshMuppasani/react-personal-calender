import React from "react";

const initializeArray = () => {
  const cellsArray = [];
  for (let i = 1; i <= 42; i++) {
    let cellRef = React.createRef();
    cellsArray.push(cellRef);
  }
  return cellsArray;
};

const gridCells = initializeArray();

export { gridCells };
