import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {useAuth} from "../contexts/AuthContext";
import firebase from "firebase/compat";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import InputBase from '@material-ui/core/InputBase';

import {TRAILS as trails} from "../trails";

import {makeStyles, withStyles} from '@material-ui/core/styles';
import AddTrailComponent from "./AddTrailComponent";
import DetailsComponent from "./DetailsComponent";
import HistoryComponent from "./HistoryComponent";
import BadgesComponent from "./BadgesComponent";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        // backgroundColor: "#a2d2fe",
        backgroundColor: 'rgba(163,211,255,0.3)',
        // minHeight: 'calc(100vh - 88px)',
        display: "flex",
        flexDirection: "column"

    },
    mainContent: {
        display: "flex",
        minHeight: 'calc(100vh - 88px)',
        width: "100%",
        alignItems: "center",
        "& .content": {
            flex: "1",
            margin: "20px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            minHeight: "70vh",
            width: '33%',
            "& svg": {
                width: '70%'
            }
        }
    }
}));


const DashboardComponent = () => {

    const classes = useStyles();

    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth()
    const [points, setPoints] = useState(0)
    const [loading, setLoading] = useState(false)
    const [userFromDb, setUserFromDb] = useState(null);

    const [open, setOpen] = React.useState(false);


    const ref = firebase.firestore().collection("points")

    const getPoints = async () => {
        // setLoading(true)
        // ref.onSnapshot(querySnapshot => {
        //     const items = [];
        //     querySnapshot.forEach(doc => {
        //         items.push(doc.data())
        //     });
        //
        //     setPoints(items)
        //     setLoading(false)
        // })
        return ref.where('user_id', '==', currentUser.uid)
            .get();

        // const addItem = item => {
        //     ref.doc(item.id)
        //         .set(item)
        //         .then(prevState => [item, ...prevState])
        //         .catch(err => {
        //             console.log(err)
        //         })
        // }

    }

    const addPoint = () => {

        ref.where('user_id', '==', currentUser.uid).get().then(querySnapshot => {
            setLoading(true)
            querySnapshot.forEach(doc => {
                ref.doc(doc.id).update({
                    points: points + 1
                })
                    .then(() => {
                        setPoints(prevState => prevState + 1);
                        setLoading(false)

                    })
            })

        }).catch(() => console.error("Error"))


    }


    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getPoints()
            .then(item => {
                const items = item.docs.map(doc => doc.data());
                setUserFromDb(items[0]);
                setPoints(items[0].points)
            })
    }, [])


    return (
        <>
            <div className={classes.container}>
                {/*/!*{loading && <h1>loading...</h1>}*!/*/}
                {/*{error && <Alert variant="outlined" severity='error'/>}*/}

                {/*<Button disabled={loading} onClick={addPoint} variant={"contained"}>Add point</Button>*/}
                <BadgesComponent />
                <main className={classes.mainContent}>
                    <DetailsComponent currentUser={currentUser} userFromDb={userFromDb} points={points}/>
                    <AddTrailComponent />
                    <HistoryComponent />
                </main>
                {/*<div style={{background: "#ff0000", height: '100px'}}></div>*/}
                {/*<div style={{display: "flex", minHeight: '100vh'}}>*/}
                {/*    <div style={{background: "#ffff00", height: '100vh', flex: 1}}></div>*/}
                {/*    <div style={{background: "#ffffa5", height: '100px', flex: 1}}></div>*/}
                {/*    <div style={{background: "#ffff00", height: '100px', flex: 1}}></div>*/}
                {/*</div>*/}
            </div>
            <Backdrop className={classes.backdrop} open={loading} onClick={handleClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
};

export default DashboardComponent;