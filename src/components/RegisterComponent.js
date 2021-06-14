import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import {useAuth} from "../contexts/AuthContext";
import firebase from "firebase/compat";


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        "& .MuiAvatar-root": {
            width: '80px',
            height: '80px'
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#3f51b5',

        "& .MuiSvgIcon-root": {
            fontSize: '3.3rem'
        }
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        "& .MuiInputBase-input": {
            color: '#223E57',
        },
        "& .MuiInput-underline:before": {
            borderColor: '#223E57',

        },
    },
    subtitle: {
        color: '#072643',
        marginBottom: '10px'
    }

}));

const RegisterComponent = () => {
    const classes = useStyles();

    const ref = firebase.firestore().collection("points")


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedDate, setSelectedDate] = useState('')

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
    const handleChangePassword2 = (e) => setPassword2(e.target.value);
    const handleChangeFirstName = (e) => setFirstName(e.target.value);
    const handleChangeLastName = (e) => setLastName(e.target.value);
    const handleDateChange = e => setSelectedDate(e.target.value);

    const {signup} = useAuth();

    const addItem = item => {
        debugger;
        ref.doc(item.id)
            .set(item)
            .then(r => console.log(r))
            .catch(err => console.error(err))

    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== password2) {
            return setError('Passwords do not match')
        }

        setError('')
        setLoading(true)
        await signup(email, password)
            .then(function (result) {
                return addItem({
                    user_id: result.user.uid,
                    age: new Date().getFullYear() - new Date(selectedDate).getFullYear(),
                    points: 0,
                    name: `${firstName} ${lastName}`,
                    history: [],
                });
            }).catch(() => setError('Failed to create an account'))

        setLoading(false)
    }


    return (
        <div className={"register-container"}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h3" className={classes.subtitle}>
                        Sign up
                    </Typography>
                    {/*{currentUser.email}*/}
                    {error && <Alert variant='outlined' severity="error">{error}</Alert>}
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    // variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    className={classes.input}
                                    InputLabelProps={{
                                        style: {color: '#223E57'}
                                    }}
                                    value={firstName}
                                    onChange={handleChangeFirstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    className={classes.input}
                                    InputLabelProps={{
                                        style: {color: '#223E57'}
                                    }}
                                    value={lastName}
                                    onChange={handleChangeLastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="date"
                                    name="date"
                                    autoComplete="date"
                                    type={'date'}
                                    className={classes.input}
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    className={classes.input}
                                    InputLabelProps={{
                                        style: {color: '#223E57'}
                                    }}
                                    value={email}
                                    onChange={handleChangeEmail}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    className={classes.input}
                                    InputLabelProps={{
                                        style: {color: '#223E57'}
                                    }}
                                    value={password}
                                    onChange={handleChangePassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password2"
                                    label="Password confirmation"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    className={classes.input}
                                    InputLabelProps={{
                                        style: {color: '#223E57'}
                                    }}
                                    value={password2}
                                    onChange={handleChangePassword2}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default RegisterComponent;