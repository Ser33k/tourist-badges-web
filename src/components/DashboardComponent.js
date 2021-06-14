import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
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
        flexDirection: "column",
        padding: "0 40px 0 40px",


    },
    mainContent: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexWrap: "wrap",
        "& .content": {
            flex: "1",
            margin: "20px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            height: "70vh",
            width: '400px',
            "& svg": {
                width: '70%'
            }
        }
    }
}));


const DashboardComponent = () => {

    const classes = useStyles();

    const {currentUser, logout} = useAuth()
    const [points, setPoints] = useState(0)
    const [loading, setLoading] = useState(false)
    const [userFromDb, setUserFromDb] = useState(null);
    const [history, setHistory] = useState([]);
    const [success, setSuccess] = useState(false);
    

    const [open, setOpen] = React.useState(false);


    const ref = firebase.firestore().collection("points")

    const getPoints = async () => {
        setLoading(true);
        return ref.where('user_id', '==', currentUser.uid)
            .get();


    }

    const handleAddTrail = async (trail, from, to) => {
        setLoading(true)
        if (trail && from && to) {
            await ref.where('user_id', '==', userFromDb.user_id).get().then(querySnapshot => {

                querySnapshot.forEach(doc => {
                    ref.doc(doc.id).update(
                        {
                            history: firebase.firestore.FieldValue.arrayUnion({
                                mainDestination: trail,
                                from: from.name,
                                to: to.name,
                                sum: from.score + to.score,
                                timestamp: new Date().getTime()
                            }),
                            points: firebase.firestore.FieldValue.increment(from.score + to.score)
                        },
                    )
                        .then(() => {
                            setSuccess(true);

                            setHistory(prevState => [...prevState, {
                                mainDestination: trail,
                                from: from.name,
                                to: to.name,
                                sum: from.score + to.score,
                                timestamp: new Date().getTime()
                            }]);
                            setPoints(prevState => prevState + from.score + to.score);
                        })
                })

                setTimeout(() => setSuccess(false), 3000);
            }).catch(() => console.error("Error"))
        }
        setLoading(false)
    }


    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getPoints()
            .then(item => {
                const items = item.docs.map(doc => doc.data());
                setUserFromDb(items[0]);
                setPoints(items[0].points);
                setHistory(items[0].history)
                // console.log(items[0].history)
                setLoading(false)
            })

    }, [])

    // console.log(userFromDb)
    return (
        <>
            <div className={classes.container}>
               <BadgesComponent points={points && points} age={userFromDb && userFromDb.age}/>
                <main className={classes.mainContent}>
                    <DetailsComponent currentUser={currentUser} userFromDb={userFromDb} points={points}/>
                    <AddTrailComponent handleAddTrail={handleAddTrail} userFromDb={userFromDb} success={success}/>
                    <HistoryComponent history={history}/>
                </main>
            </div>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
};

export default DashboardComponent;