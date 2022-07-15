// @ts-ignore
import React from "react";

import { Box } from "@mui/system";

import { carregandoStyle } from "./CarregandoStyle";
import { Typography } from "@mui/material";

export const Carregando = () => {
  return (
    <Box sx={carregandoStyle.container}>
      <Box sx={carregandoStyle.loadingWrapper}>
        <Box sx={carregandoStyle.loadingArea}>
          <Box sx={carregandoStyle.pillOne} />
          <Box sx={carregandoStyle.pillTwo} />
          <Box sx={carregandoStyle.pillThree} />
          <Typography
            variant="body1"
            color="primary"
            sx={{ marginTop: "1rem" }}
          >
            Carregando...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
