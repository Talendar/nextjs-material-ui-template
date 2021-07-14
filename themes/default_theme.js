import { createTheme } from "@material-ui/core/styles";

// Create a theme instance
const theme = createTheme({
    palette: {
        primary: {
            main: "#1b5e20",
        },
        secondary: {
            main: "#66bb6a",
        },
        error: {
            main: "#c62828",
        },
        background: {
            default: "#b3d299",
        },
    },
});

export default theme;
