import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import {useAuth} from "../contexts/AuthContext";
import firebase from "firebase/compat";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import AddTrailComponent from "./AddTrailComponent";
import DetailsComponent from "./DetailsComponent";
import HistoryComponent from "./HistoryComponent";
import BadgesComponent from "./BadgesComponent";

import ConfettiGenerator from "confetti-js";

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
        padding: "40px",


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
            height: "80vh",
            width: '400px',
            "& svg": {
                width: '70%'
            }
        }
    },
    confetti: {
        position: "absolute",
        maxWidth: "95vw",
        marginLeft: "auto",
        marginRight: "auto"
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "3px 3px 3px 5px #fff",
        padding: theme.spacing(2, 4, 3),
        outline: "none"
    },
    modalButton: {
        backgroundColor: "green",
        color: "#fff",
        fontSize: 20,
        padding: "10px 20px",
        marginLeft: 0
    }
}));

function getModalStyle() {
    const top = 50
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const DashboardComponent = () => {

    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const [openModal, setOpenModal] = useState(false);

    const {currentUser, logout} = useAuth()
    const [points, setPoints] = useState(0)
    const [loading, setLoading] = useState(false)
    const [userFromDb, setUserFromDb] = useState(null);
    const [history, setHistory] = useState([]);
    const [success, setSuccess] = useState(false);


    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Good work!

            </h2>
            <p id="simple-modal-description">
               You've just earned a new badge!

            </p>
            <p style={{textAlign: "right"}}>Congratulations, Tourist Badges</p>
            <Button className={classes.modalButton} onClick={handleCloseModal}>Nice</Button>
        </div>
    );

    const ref = firebase.firestore().collection("points")

    const getPoints = async () => {
        setLoading(true);
        return ref.where('user_id', '==', currentUser.uid)
            .get();
    }

    const newBadgeUnlocked = () => {
        const confettiSettings = {target: 'my-canvas'};
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render()

        setTimeout(confetti.clear, 3000);

        setOpenModal(true);
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
                            setPoints(prevState => {
                                if ((userFromDb.age > 10 && userFromDb.age < 16) || userFromDb.age > 50) {
                                    if (prevState < 50 && prevState + from.score + to.score > 50) {
                                        newBadgeUnlocked()
                                    } else if (prevState < 100 && prevState + from.score + to.score > 100) {
                                        newBadgeUnlocked()
                                    } else if (prevState < 300 && prevState + from.score + to.score > 300) {
                                        newBadgeUnlocked()
                                    } else if (prevState < 600 && prevState + from.score + to.score > 600) {
                                        newBadgeUnlocked()
                                    }
                                } else if ((userFromDb.age > 7 && userFromDb.age < 11)) {
                                    if (prevState < 40 && prevState + from.score + to.score > 40){
                                        newBadgeUnlocked();
                                    } else if (prevState < 80 && prevState + from.score + to.score > 80){
                                        newBadgeUnlocked();
                                    }
                                } else if ((userFromDb.age > 16 && userFromDb.age < 51)){
                                    if (prevState < 60 && prevState + from.score + to.score > 60) {
                                        newBadgeUnlocked()
                                    } else if (prevState < 120 && prevState + from.score + to.score > 120) {
                                        newBadgeUnlocked()
                                    } else if (prevState < 360 && prevState + from.score + to.score > 360) {
                                        newBadgeUnlocked()
                                    } else if (prevState < 720 && prevState + from.score + to.score > 720) {
                                        newBadgeUnlocked()
                                    }
                                }


                                return prevState + from.score + to.score;
                            });
                        })
                })

                setTimeout(() => setSuccess(false), 3000);
            }).catch(() => console.error("Error"))
        }
        setLoading(false)
    }



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
                <canvas className={classes.confetti} id="my-canvas"></canvas>
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
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </>
    );
};

export default DashboardComponent;