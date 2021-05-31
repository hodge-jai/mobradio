import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Arial"',
    fontSize: 12,
    subtitle1: {
      color: "#FFFFFF",
    },
    body1: {
      color: "#FFFFFF",
    },
    h5: {
      color: "#FFFFFF",
    },
    a: {
      color: "#4287f5"
    }
  },
  palette: {
    action: { disabledBackground: "#209c17" },
    primary: { main: "#209c17" },
    secondary: { main: "#4287f5" },
  },
});
