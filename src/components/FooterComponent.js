import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footer: {
        height: "5vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#84B44C",
        "& > p": {
            color: "#fff"
        }
    }
}));

const FooterComponent = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <p>&copy; TOURIST BADGES 2021</p>
        </footer>
    );
};

export default FooterComponent;