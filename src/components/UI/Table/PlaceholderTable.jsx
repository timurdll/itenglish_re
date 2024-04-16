import React from "react";
import "./PlaceholderTable.css";

const PlaceholderTable = () => {
  return (
    <div className="placeholder-table">
      <div className="table">
        <div className="table-header">
          <div className="header-cell">Header 1</div>
          <div className="header-cell">Header 2</div>
          <div className="header-cell">Header 3</div>
        </div>
        <div className="table-body">
          <div className="table-row">
            <div className="table-cell">Row 1, Cell 1</div>
            <div className="table-cell">Row 1, Cell 2</div>
            <div className="table-cell">Row 1, Cell 3</div>
          </div>
          <div className="table-row">
            <div className="table-cell">Row 2, Cell 1</div>
            <div className="table-cell">Row 2, Cell 2</div>
            <div className="table-cell">Row 2, Cell 3</div>
          </div>
          {/* Add more rows as needed */}
        </div>
      </div>
    </div>
  );
};

export default PlaceholderTable;
