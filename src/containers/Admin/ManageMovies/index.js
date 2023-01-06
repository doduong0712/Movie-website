import React from "react";
import useTitle from "../../../Hook/useTitle";
import MainContent from "../MainContent";
import Paper from "@material-ui/core/Paper";
import useAdminStyles from "../../../style/useAdminStyle";
import MoviesTable from "./MoviesTable";

function ManageMovies() {
  useTitle("Quản lý phim", "admin");

  const classes = useAdminStyles();
  return (
    <MainContent title="Manage Movies">
      <Paper className={classes.paper} elevation={8}>
        <MoviesTable />
      </Paper>
    </MainContent>
  );
}

export default ManageMovies;
