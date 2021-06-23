import React, {useState} from 'react';
import Modal from "@material-ui/core/Modal";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getAuth, updatePassword } from "firebase/auth";
import {useAuth} from "../contexts/AuthContext";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "3px 3px 3px 5px #fff",
        padding: theme.spacing(2, 4, 3),
        outline: "none"
    },
    form: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    input: {
        width: "75%",
        marginBottom: "10px"
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        marginTop: "20px"
    },
    cancelButton: {
        backgroundColor: "#ea4b4b",
        "&:hover": {
            backgroundColor: "#c10505",
        }
    },
    changeButton: {
        backgroundColor: "#333",
        color: "#A3D3FF",
        "&:hover": {
            backgroundColor: "#A3D3FF",
            color: "#333"
        }
    },
    margin: {
        margin: "8px"
    }
}))


function getModalStyle() {
    const top = 50
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const ChangePasswordComponent = (props) => {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const {logout} = useAuth();
    const auth = getAuth();

    const user = auth.currentUser;

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [problem, setProblem] = useState(false);

    async function handleLogout() {
        setError(false)
        try {
            await logout()
        } catch {
            setError(true)
        }
    }

    const handleChangePasswordSubmit = (e) => {
        e.preventDefault()

        if (newPassword === confirmPassword && newPassword.length > 6){
            updatePassword(user, newPassword).then(() => {
                // Update successful.
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                    handleClose()
                    handleLogout()
                    setError(false)
                }, 2000)
            }).catch((error) => {
                // An error ocurred
                // ...
                setError(true);
                setTimeout(()=> {
                    setError(false)
                }, 3000)
            });


        } else {
            setProblem(true)
            setTimeout(()=> {
                setProblem(false);
            }, 2000)
        }



    }

    const handleClose = () => {
        props.handleCloseModal();
        setConfirmPassword('');
        setNewPassword('')
    }

    const changePasswordForm = (
        <div style={modalStyle} className={classes.paper}>
            <Typography align={"center"} variant={'h5'} >Reset password</Typography>
            {success && <Alert className={classes.margin} severity="success">Password changed successfully!</Alert>}
            {error && <Alert className={classes.margin} variant='filled' severity="error">Something went wrong!</Alert>}
            {problem && <Alert className={classes.margin} variant='outlined' severity={'warning'}>Passwords don't match or they are too short</Alert>}
            <form onSubmit={handleChangePasswordSubmit} className={classes.form}>
                <TextField
                    label={"New password"}
                    className={classes.input}
                    value={newPassword}
                    onChange={e => setNewPassword(e.currentTarget.value)}
                    type={'password'}
                />
                <TextField
                    label={"Confirm new password"}
                    className={classes.input}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                    type={'password'}
                />
                <div className={classes.buttonsContainer}>
                    <Button onClick={handleClose} className={classes.cancelButton}>Cancel</Button>
                    <Button type={'submit'} className={classes.changeButton}>Change</Button>
                </div>
            </form>
        </div>
    );

    return (
        <>
            <Modal
                open={props.changing}
                onClose={props.handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {changePasswordForm}
            </Modal>
        </>
    );
};

export default ChangePasswordComponent;