import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const Table = () => {
  const [gridApi, setGridApi] = useState(null);
  const [isEmailHidden, setIsEmailHidden] = useState(false);

  const columns = [
    { headerName: "Id", field: "id" },
    { headerName: "Name", field: "name" },
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
      hide: isEmailHidden,
    },
    { headerName: "Body", field: "body" },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((resp) => resp.json())
      .then((data) => params.api.applyTransaction({ add: data }));
  };

  const onExportClick = () => {
    if (gridApi) gridApi.exportDataAsCsv();
  };

  const showHiddenField = () => {
    setIsEmailHidden((prev) => {
      gridApi.setColumnVisible("email", !prev);
      return !prev;
    });
  };
  console.log("GridApi", gridApi);
  const searchText = (e) => {
    if (gridApi) {
      console.log("search value", document.getElementById("search").value);
      gridApi.setGridOption(
        "quickFilterText",
        document.getElementById("search").value
      );
    }
  };

  return (
    <div>
      <button onClick={onExportClick}>Export</button>
      <button onClick={showHiddenField}>
        {isEmailHidden ? "Show" : "Hide"} Email Column
      </button>
      <div className="searchBar">
        <input
          type="text"
          id="search"
          placeholder="Search..."
          className="searchInput"
          onChange={searchText}
        />
      </div>
      <div className="ag-theme-quartz" style={{ height: 600 }}>
        <AgGridReact
          columnDefs={columns}
          onGridReady={onGridReady}
          rowSelection="multiple"
          defaultColDef={{
            sortable: true,
            editable: true,
            filter: true,
            floatingFilter: true,
            flex: 1,
          }}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default Table;
