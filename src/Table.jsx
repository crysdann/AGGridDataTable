import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

// import { CsvExportModule } from "@ag-grid-community/csv-export";

const Table = () => {
  const [gridApi, setGridApi] = useState(null);
  const [isEmailHidden, setIsEmailHidden] = useState(true);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Id",
      field: "id",
    },
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Email",
      field: "email",
      cellClass: (params) => {
        if (params.value && params.value.includes("biz")) {
          return "biz";
        } else if (params.value && params.value.includes("org")) {
          return "org";
        } else if (params.value && params.value.includes("com")) {
          return "com";
        } else if (params.value && params.value.includes("net")) {
          return "net";
        } else if (params.value && params.value.includes("edu")) {
          return "edu";
        } else if (params.value && params.value.includes("gov")) {
          return "gov";
        }
      },
      hide: true,
    },
    {
      headerName: "Body",
      field: "body",
    },
  ]);
  const gridOptions = {
    rowSelection: { mode: "multiRow", checkboxes: true },
    defaultColDef: {
      sortable: true,
      editable: true,
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    paginationPageSize: 10,
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((resp) => resp.json())
      .then((data) => params.api.applyTransaction({ add: data }));
  };
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };
  const onSelectionChanged = (event) =>
    console.log("event", event.api.getSelectedRows());

  const showHiddenField = () => {
    if (gridApi) {
      setIsEmailHidden((prevIsHidden) => {
        // debugger;
        const newIsHidden = !prevIsHidden;
        setColumnDefs((prevDefs) =>
          prevDefs.map((col) =>
            col.field === "email" ? { ...col, hide: newIsHidden } : col
          )
        );

        return newIsHidden;
      });
    } else {
      console.log("GridColumnApi is not initialized");
    }
  };
  return (
    <div>
      <button onClick={() => onExportClick()}>Export</button>
      <button onClick={showHiddenField}>
        {isEmailHidden ? "Show" : "Hide"} Email Column
      </button>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 600 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          gridOptions={gridOptions}
          enableBrowserTooltips={true}
          onSelectionChanged={onSelectionChanged}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 30, 40, 50]}></AgGridReact>
      </div>
    </div>
  );
};

export default Table;
