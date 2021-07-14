import { useState, createRef, useEffect } from "react";
import NextLink from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import AppBar from "@material-ui/core/AppBar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from '@material-ui/icons/Close';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import MuiLink from "@material-ui/core/Link";
import HelpOutline from "@material-ui/icons/HelpOutline";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Mail from "@material-ui/icons/Mail";
import Login from "mdi-material-ui/Login";

import { CrushAndSpinToggleIcon } from "./animated_icon_toggle";
import logoImg from "../public/logo.png";


export const APP_BAR_HEIGHT = 64;
const collapseBreakpoint = "md";

const useStyles = makeStyles((theme) => ({
    appBarBase: {
        backgroundColor: "transparent",
        transition: theme.transitions.create(['background-color', 'transform'], {
            duration: theme.transitions.duration.standard,
        }),
        zIndex: theme.zIndex.drawer + 1,
        height: APP_BAR_HEIGHT,
        justifyContent: "center"
    },
    appBarColored: {
        backgroundColor: "white",
    },
    menu: {
        position: "fixed",
        top: APP_BAR_HEIGHT,
        width: "100%",
        zIndex: theme.zIndex.drawer,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: theme.spacing(2),
        boxShadow: "0 0 7px black",
        overflowY: "scroll",
        maxHeight: `calc(100% - ${APP_BAR_HEIGHT}px)`,
    },
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: theme.zIndex.drawer - 1,
    },
    menuItem: {
        justifyContent: "flex-start",
        fontSize: "1.4em",
        padding: "10px",
        borderRadius: "12px",
        [theme.breakpoints.up(collapseBreakpoint)]: {
            justifyContent: "unset",
            fontSize: "1.2em",
            margin: theme.spacing(0, 1),
        },
    },
    loginButton: {
        fontSize: "1.5em",
        marginTop: theme.spacing(4.5),
        alignSelf: "flex-start",
        marginLeft: 6,
        [theme.breakpoints.up(collapseBreakpoint)]: {
            fontSize: "1.2em",
            marginTop: 0,
            alignSelf: "unset",
            marginLeft: theme.spacing(6),
            height: 40,
        },
    },
    logo: {
        width: 42,
        height: 42,
        ["&:hover"]: {
            cursor: "pointer",
        },
    },
    menuToggleIcon: {
        marginLeft: "auto",
        [theme.breakpoints.up(collapseBreakpoint)]: {
            display: "none",
        },
    },
    title: {
        marginLeft: theme.spacing(1.25),
        display: "unset",
        color: "black",
    },
    desktopMenuContainer: {
        display: "none",
        [theme.breakpoints.up(collapseBreakpoint)]: {
            display: "flex",
            flexDirection: "row",
            marginLeft: "auto",
            alignItems: "center",
        },
    },
}));


export default function Navbar() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = !useMediaQuery(theme.breakpoints.up(collapseBreakpoint));

    const scrollLockTargetRef = createRef();
    const scrollTrigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    const [menuOpen, _setMenuOpen] = useState(false);
    const setMenuOpen = (open) => {
        if(open) disableBodyScroll(scrollLockTargetRef);
        else enableBodyScroll(scrollLockTargetRef);
        _setMenuOpen(open);
    };

    if(menuOpen && !isMobile)
        setMenuOpen(false);

    useEffect(() => {
        return () => clearAllBodyScrollLocks();
    }, []);

    const includeIcon = (Icon) => isMobile ? <Icon style={{marginRight: 10}}/> : <></>;
    const menuItems = (
        <>
            <Button className={classes.menuItem} startIcon={includeIcon(LibraryBooks)}>
                Blog
            </Button>
            <Button className={classes.menuItem} startIcon={includeIcon(HelpOutline)}>
                About
            </Button>
            <Button className={classes.menuItem} startIcon={includeIcon(Mail)}>
                Contact
            </Button>
            <Button className={classes.loginButton}
                    variant="outlined" color="primary"
                    startIcon={<Login />}>
                Login
            </Button>
        </>
    );

    return (
        <>
            <AppBar className={clsx(classes.appBarBase, { [classes.appBarColored]: menuOpen || scrollTrigger})}
                    elevation={0}>
                <Toolbar>
                    {/* Logo */}
                    <NextLink href="/">
                        <div className={classes.logo}>
                            <Image src={logoImg} layoyt="fill" objectFit="fill" alt="Logo"/>
                        </div>
                    </NextLink>

                    {/* Title */}
                    <NextLink href="/" passHref>
                        <MuiLink variant="h5"
                                 underline="none" className={classes.title}>
                            MyApp
                        </MuiLink>
                    </NextLink>

                    {/* Menu toggle icon */}
                    <IconButton edge="start" color="primary" aria-label="menu"
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={classes.menuToggleIcon}>
                        <CrushAndSpinToggleIcon
                            on={menuOpen}
                            onIcon={<CloseIcon />}
                            offIcon={<MenuIcon />}
                            size={32}
                        />
                    </IconButton>

                    <div className={classes.desktopMenuContainer}>
                        {menuItems}
                    </div>
                </Toolbar>
            </AppBar>

            {/* Mobile menu */}
            <Slide appear={false} direction="down" in={menuOpen}
                   timeout={500}>
                <div className={classes.menu} ref={scrollLockTargetRef}>
                    {menuItems}
                </div>
            </Slide>

            {/* Overlay */}
            <Fade in={menuOpen} timeout={400}>
                <div className={classes.overlay} onClick={() => setMenuOpen(false)}/>
            </Fade>
        </>
    );
}