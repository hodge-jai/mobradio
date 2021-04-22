import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Montserrat"',
    fontSize: 12,
    subtitle1: {
      color: "#FF510C",
    },
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    primary: { main: "#F8F8FF" },
    secondary: { main: "#FF743D" }
  }
});
