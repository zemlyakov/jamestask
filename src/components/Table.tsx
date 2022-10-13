import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { CellClickedEvent } from "ag-grid-community/dist/lib/events";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import DataContext from "../core/DataContext";

const Table = () => {
  const gridRef = useRef() as React.RefObject<AgGridReact>;

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

  // Example using Grid's API
  const buttonListener = useCallback(() => {
    gridRef.current?.api.deselectAll();
  }, []);

  return (
    <DataContext.Consumer>
      {(data) => (
        <div>
          <button type="button" onClick={buttonListener}>
            Push Me
          </button>
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: 500 }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={(data ?? {}).cars}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows
              rowSelection="multiple"
              onCellClicked={cellClickedListener}
            />
          </div>
        </div>
      )}
    </DataContext.Consumer>
  );
};

export default Table;
