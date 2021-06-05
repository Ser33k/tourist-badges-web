import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Link, TextField} from "@material-ui/core";
import icon from './images/mountain.png'
import {useAuth} from "../contexts/AuthContext";
import Alert from "@material-ui/lab/Alert";

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
            "&:hover": {
                borderColor: '#A3D3FF',
            }
        },
        "& .MuiInputBase-input": {
            color: '#A3D3FF',

        }

    },
    buttonLogin: {
        backgroundColor: "#84B44C"
    },
    buttonLogout: {
        backgroundColor: "#A3D3FF"
    },
    loginForm: {
        display: 'flex'
    }


}));

const NavbarComponent = () => {

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);


    const {currentUser, login, logout} = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('')
            setLoading(true)
            await login(email, password)
            setPassword('')
            setEmail('')


        } catch {
            setError('Failed to sign in')
            setPassword('')
        }

        setLoading(false)
    }

    async function handleLogout(){
        setError('')
        try{
            await logout()
        }catch {
            setError('Failed to logout')
        }
    }

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

                    {currentUser ?
                        (
                            <>
                                <Button className={classes.buttonLogout} onClick={handleLogout}>Logout</Button>
                            </>
                                )
                            :
                        (
                        <form className={classes.loginForm} onSubmit={handleSubmit}>
                        <TextField InputLabelProps={{
                            style: {color: '#A3D3FF'}
                        }}
                                   className={classes.input} id="email" label="E-mail" type="email" autoFocus
                                   required
                                   value={email}
                                   onChange={handleChangeEmail}
                        />
                        <TextField InputLabelProps={{
                            style: {color: '#A3D3FF'}
                        }} className={classes.input} id="password" label="Password" type="password" required
                                   value={password}
                                   onChange={handleChangePassword}
                        />
                        <Button type='submit' className={classes.buttonLogin}>Login</Button>
                    </form>
                    )
                    }
                    {error && <Alert style={{marginLeft: '15px'}} variant='filled' severity="error">{error}</Alert>}

                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavbarComponent;