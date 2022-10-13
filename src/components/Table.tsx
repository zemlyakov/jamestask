import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { CellClickedEvent } from "ag-grid-community/dist/lib/events";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Table = () => {
  const gridRef = useRef() as React.RefObject<AgGridReact>;
  const [rowData, setRowData] = useState();

  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price" },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: CellClickedEvent) => {
    // eslint-disable-next-line no-console
    console.log("cellClicked", event);
  }, []);

  // Example load data from sever
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rd) => setRowData(rd));
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback(() => {
    gridRef.current?.api.deselectAll();
  }, []);

  return (
    <div>
      <button type="button" onClick={buttonListener}>
        Push Me
      </button>
      <div className="ag-theme-alpine" style={{ width: 500, height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
        />
      </div>
    </div>
  );
};

export default Table;
