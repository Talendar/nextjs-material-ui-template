import React from "react";
import { makeStyles } from "@material-ui/core";

const clipPath = (value) => ({
    WebkitClipPath: value,
    clipPath: value
});


const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        display: "inline-block",
    },
    icon: {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
    },
}));


function ToggleAnimationBase({ className, onIcon, offIcon, onIconStyle, offIconStyle, size, ...other }) {
    const classes = useStyles();
    return (
        <div className={`${classes.root} ${className || ""}`} style={{width: size, height: size}} {...other}>
            { React.cloneElement(offIcon, { className: classes.icon, style: offIconStyle }) }
            { React.cloneElement(onIcon, { className: classes.icon, style: onIconStyle }) }
        </div>
    );
}


export function DiagonalClipToggleIcon({ on, duration=600, ...other }) {
    const transitionStyle = (
        `clip-path ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1), ` +
        `-webkit-clip-path ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`
    );

    return (
        <ToggleAnimationBase
            offIconStyle={{
                transition: transitionStyle,
                ...clipPath(on ? "polygon(0% 0%, 0% 0%, 0% 0%)" : "polygon(0% 200%, 0% 0%, 200% 0%)"),
            }}
            onIconStyle={{
                transition: transitionStyle,
                ...clipPath(on ? "polygon(100% -100%, 100% 100%, -100% 100%)" : "polygon(100% 100%, 100% 100%, 100% 100%)"),
            }}
            {...other}
        />
    );
}


export function CrushAndSpinToggleIcon({ on, duration=500, ...other }) {
    const transitionStyle = `transform ${duration}ms ease-in`;
    return (
        <ToggleAnimationBase
            offIconStyle={{
                transition: transitionStyle,
                transform: `scaleY(${on ? 0 : 1})`,
            }}
            onIconStyle={{
                transition: transitionStyle,
                transform: `scaleY(${on ? 1 : 0}) rotate(${on ? 0 : 180}deg)`,
            }}
            {...other}
        />
    );
}