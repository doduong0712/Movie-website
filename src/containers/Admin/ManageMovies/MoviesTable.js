import React from "react";
import MyTable from "../MyTable";

function MoviesTable() {
  return (
    <>
      <MyTable
        title="Movie List"
        tableType="Movie Table"
        customTableOption={{ filtering: false }}
      />
    </>
  );
}

export default MoviesTable;
