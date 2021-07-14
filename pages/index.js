import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Navbar from "../components/navbar";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    ctaBackground: {
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.primary.light,
        animation: "1500ms $waveEffect ease-in-out",
        animationFillMode: "forwards",
    },
    "@keyframes waveEffect": {
        "0%": {
            WebkitClipPath: "ellipse(11% 11% at 53% 50%)",
            clipPath: "ellipse(11% 11% at 53% 50%)",
        },
        "50%": {
            WebkitClipPath: "ellipse(22% 50% at 53% 50%)",
            clipPath: "ellipse(22% 50% at 53% 50%)",
        },
        "100%": {
            WebkitClipPath: "ellipse(52% 61% at 14% 54%)",
            clipPath: "ellipse(52% 61% at 14% 54%)",
        },
    },
    "@keyframes growEffect": {
        "0%": {
            opacity: 0,
            transform: "translateY(-50%)",
        },
        "100%": {
            opacity: 1,
            transform: "translateY(0)",
        },
    },
    ctaContainer: {
        position: "absolute",
        textAlign: "center",
        opacity: 0,
        animation: "1500ms $growEffect ease-in-out 800ms",
        animationFillMode: "forwards",
        top: "15vh",
        width: "90%",
        marginLeft: "5%",
        zIndex: 1,
        [theme.breakpoints.up("sm")]: {
            top: "18vh",
            width: "70%",
            marginLeft: "15%",
        },
        [theme.breakpoints.up("md")]: {
            top: "22vh",
            width: "50%",
            marginLeft: "25%",
        },
    },
    ctaTitle: {
        color: "white",
    },
    ctaText: {
        color: "white",
        marginTop: theme.spacing(2),
    },
    ctaBtn: {
        marginTop: theme.spacing(5),
        fontSize: "1.6em",
    },
    bottomContainer: {
        width: "100%",
        height: "100vh",
        background: "linear-gradient(180deg, #b3d299, #3E9944)",
        zIndex: 0,
    },
}));


export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navbar />
            <div className={classes.ctaBackground}/>

            <div className={classes.ctaContainer}>
                <Typography variant="h3" className={classes.ctaText}>Lorem Ipsum</Typography>
                <Typography variant="h5" className={classes.ctaText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis maximus tincidunt.
                    Proin sagittis eros dui, eget malesuada eros accumsan in. Integer a nisi eu nunc facilisis sodales
                    non sit amet metus.
                </Typography>
                <Button variant="contained" size="large" color="secondary" className={classes.ctaBtn}>Start</Button>
            </div>

            <div className={classes.bottomContainer}/>
        </div>
    );
}
