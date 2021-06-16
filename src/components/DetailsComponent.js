import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {makeStyles} from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    details: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
    },
    value: {
        fontWeight: "bold",
        fontSize: "30px"
    },
    points: {
        fontSize: "40px",
        borderBottom: "1px solid rgba(163,211,255,0.8)",
        width: "100%",
        paddingBottom: "10px",
        color: "#223E57"
    },
    detail: {
        flex: "1 0",
        "& > p": {
            color: "#223E57"
        }
    }

}))

const barStyles = {
    width: "50%",
    // pathColor: `rgba(62, 152, 199, ${percentValue / 100})`,
    textColor: '#f88',
    trailColor: 'rgba(163,211,255,0.45)',
    backgroundColor: '#3e98c7'
}

const DetailsComponent = (props) => {
    const classes = useStyles();

    const [percentValue, setPercentValue] = useState(0);

    const calculatePercentages = () => {
        debugger;
        const age = props.userFromDb && props.userFromDb.age;
        const points = props.points;


        if (age > 7 && age < 11){
            if (points > 79){
               return points / 80 * 100;
            } else if (points > 39){
                return (points - 40) / 40 * 100;
            } else {
                return points / 40 * 100;
            }
        } else if ((age > 10 && age < 16) || age > 50){

            if (points >= 600){
                return points / 600 * 100;
            } else if (points >= 300){
                return (points - 300) / 300 * 100;
            } else if (points >= 100){
                return (points - 100) / (300 - 100) * 100;
            } else if (points >= 50){
                return (points - 50) / 50 * 100;
            } else {
                return points / 50 * 100;
            }
        } else if (age > 15 && age < 51){
            if (points >= 720){
                return points / 360 * 100
            } else if (points >= 360){
                return (points - 360) / 360 * 100
            } else if (points >= 120){
                return (points - 120) / 240 * 100
            } else if (points >= 60){
                return (points - 60) / 60 * 100
            } else {
                return points / 60 * 100;
            }
        }

    }


    useEffect(() => {
        if (props.userFromDb){
            setPercentValue(calculatePercentages() | 0)
        }
    }, [props.points])
    return (
        <Paper  className={'content'}>
            <CircularProgressbar styles={buildStyles(barStyles)} value={percentValue} text={`${percentValue}%`} />

            <h2 className={classes.points}>{props.points} pt.</h2>
            <div className={classes.details}>
                <div className={classes.detail}>
                    <p>Age</p>
                    <p className={classes.value}>{props.userFromDb && props.userFromDb.age}</p>
                </div>
                <div className={classes.detail}>
                    <p>Name</p>
                    <p className={classes.value}>{props.userFromDb && props.userFromDb.name}</p>
                </div>
            </div>
        </Paper>
    );
};

export default DetailsComponent;