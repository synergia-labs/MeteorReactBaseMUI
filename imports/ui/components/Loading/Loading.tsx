import Box from "@mui/material/Box";
import React from "react";
import { loadingStyleSx } from "/imports/ui/components/Loading/LoadingStyle";
import { Carregando } from "/imports/ui/components/Loading/Carregando";

export function Loading(): JSX.Element {
  return (
    <Box component={"div"} sx={loadingStyleSx.container}>
      <Carregando />
    </Box>
  );
}

interface ILoading {
  loading: boolean;
}

/**
 * Show Compoment se loading props is false.
 * @param Component
 */
export function showLoading<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P & ILoading> {
  return ({ loading, ...props }) => {
    if (loading) {
      return <Loading />;
    } else {
      return <Component {...(props as P)} />;
    }
  };
}
