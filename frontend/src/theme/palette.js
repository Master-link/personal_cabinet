import { amber, blue, green, grey, red } from '@material-ui/core/colors';

const white = '#ffffff';

export const palette = {
  white,
  green,
  red,
  amber,
  grey,
  primary: {
    light: blue[500],
    main: "#2196f3",
    dark: blue[800],
  },
  secondary: {
    light: grey[500],
    main: "#343a40",
    dark: grey[800],
  },
  success: {
    light: green[500],
    main: green[700],
    dark: green[800],
  },
  info: {
    light: blue[500],
    main: blue[700],
    dark: blue[800],
  },
  warning: {
    light: amber[500],
    main: amber[700],
    dark: amber[800],
  },
  error: {
    light: red[500],
    main: red[700],
    dark: red[800],
  },
};