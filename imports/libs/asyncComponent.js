import React from "react";
import Loadable from "react-loadable";
import CircularProgress from "@mui/material/CircularProgress";

const asyncComponent = (
  importingComponent,
  LoadingComponent = () => <CircularProgress color="secondary" />
) =>
  Loadable({
    loader: importingComponent,
    loading: LoadingComponent, // Loading screen when asynchronously importing component
  });

export default asyncComponent;
