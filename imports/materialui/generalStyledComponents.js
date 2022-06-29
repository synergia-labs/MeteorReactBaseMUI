import { styled } from "@mui/material/styles";

export const StyledText = styled("div")(({ theme }) => ({
  "--defaultColor": theme.palette.background.default,
  "--color1": theme.palette.background.color1,
  "--color2": theme.palette.background.color2,
  "--color3": theme.palette.background.color3,
  "& p": {
    ...theme.typography.body1,
  },
  "& h1": {
    ...theme.typography.h1,
    color: theme.palette.primary.main,
  },
  "& h2": {
    ...theme.typography.h2,
  },
  "& h3": {
    ...theme.typography.h3,
  },
}));
