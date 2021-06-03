import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {TextField} from "@material-ui/core";
import icon from './images/mountain.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: 'transparent linear-gradient(\n' +
            '137deg\n' +
            ',#072643 0%,#223E57 100%) 0% 0% no-repeat padding-box',
        color: '#A3D3FF',

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: "left",
        fontFamily: 'Roboto'
    },
    input: {
        marginRight: 10,
        color: '#A3D3FF',
        "& .MuiInput-underline:before": {
            borderColor: '#A3D3FF',
            "&:hover":{
                borderColor: '#A3D3FF',
            }
        },
        "& .MuiInputBase-input": {
            color: '#A3D3FF',

        }

    },
    button: {
        backgroundColor: "#84B44C"
    }

}));

const NavbarComponent = () => {

    const classes = useStyles();

    return (
        <>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <img src={icon} alt="icon"/>
                    </IconButton>
                    <Typography variant="h3" className={classes.title}>
                        Tourist badges
                    </Typography>
                    <TextField InputLabelProps={{
                        style: {color: '#A3D3FF'}
                    }}
                               className={classes.input} id="username" label="Username" type="email" autoFocus
                               required/>
                    <TextField InputLabelProps={{
                        style: {color: '#A3D3FF'}
                    }} className={classes.input} id="username" label="Password" type="password" required/>
                    <Button className={classes.button} >Login</Button>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavbarComponent;