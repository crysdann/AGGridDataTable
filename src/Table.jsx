import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
// import { CsvExportModule } from "@ag-grid-community/csv-export";

const Table = () => {
  // const data = [
  //   { id: "Marc", name: 16, email: 2001, body: "898-787-6787" },
  //   { name: "John", age: 43, birthyear: 1997, phonenumber: "676-343-5674" },
  //   { name: "Phil", age: 33, birthyear: 2002, phonenumber: "565-434-4335" },
  // ];
  const columns = [
    {
      headerName: "Id",
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: "Name",
      field: "name",
      // cellStyle: (params) =>
      //   params.value > 18
      //     ? { borderLeft: "4px solid green" }
      //     : { borderLeft: "4px solid red" },
      // cellClass: (params) => (params.value > 18 ? "moreThan18" : "lessThan18"),
      // tooltipField: "name",
    },
    {
      headerName: "Email",
      field: "email",
    },
    {
      headerName: "Body",
      field: "body",
    },
  ];
  const gridOptions = {
    rowSelection: { mode: "multiRow" },
    defaultColDef: {
      sortable: true,
      editable: true,
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
  };
  let gridApi;
  const onGridReady = (params) => {
    gridApi = params.api;
    console.log("params: ", params);
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((resp) => resp.json())
      .then((resp) => params.api.applyTransaction({ add: resp }));
  };
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };
  const onSelectionChanged = (event) =>
    console.log("event", event.api.getSelectedRows());
  const rowSelectionType = "multiple";
  return (
    <div>
      <button onClick={() => onExportClick()}>Export</button>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          // rowData={data}
          columnDefs={columns}
          onGridReady={onGridReady}
          gridOptions={gridOptions}
          enableBrowserTooltips={true}
          rowSelection={rowSelectionType}
          onSelectionChanged={onSelectionChanged}
          rowMultiSelectWithClick={true}></AgGridReact>
      </div>
    </div>
  );
};

export default Table;
