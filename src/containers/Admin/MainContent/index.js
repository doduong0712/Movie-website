import React from "react";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import PageTitle from "../PageTitle";
import useAdminStyles from "../../../style/useAdminStyle";

function MainContent(props) {
  const classes = useAdminStyles();
  const { title, children } = props;
  return (
    <Container maxWidth="lg" className={classes.container}>
      {/* <PageTitle title="Manage Showtime" /> */}
      {title && <PageTitle title={title} />}
      <Grid container spacing={3}>
        {/* <Paper className={classes.paper}> */}
        <Grid item xs={12}>
          {children}
          {/* <ShowtimeTable /> */}
          {/* </Paper> */}
        </Grid>
      </Grid>
    </Container>
  );
}

MainContent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MainContent;
