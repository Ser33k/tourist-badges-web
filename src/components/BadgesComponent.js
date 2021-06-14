import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import popularna from './images/popularna.png'
import brazowa from './images/brazowa.png';
import srebrna from './images/srebrna.png';
import zlota from './images/zlota.png';
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    badges: {

        width: '70vw',
        marginTop: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: "10px"
    },
    images: {
        display: "flex",
        justifyContent: "space-around",
    },
    opacity: {
        opacity: 0.2
    },
    header: {

        borderBottom: '3px solid #A3D3FF',
        marginBottom: '15px',
        paddingBottom: '5px',
        display: "inline-block",
        color: '#72b4fc'

    }

}));


const BadgesComponent = (props) => {
    const classes = useStyles();

    const [popularOpacity, setPopularOpacity] = useState(true);
    const [brownOpacity, setBrownOpacity] = useState(true);
    const [silverOpacity, setSilverOpacity] = useState(true);
    const [goldOpacity, setGoldOpacity] = useState(true);

    const setAllBadges = () => {
        setPopularOpacity(false);
        setBrownOpacity(false);
        setSilverOpacity(false);
        setGoldOpacity(false);
    }

    const setBadgesOpacity = () => {
        console.log("opacity")
        const {age, points} = props;

        console.log(props)
        if (age > 7 && age < 11){
            if (points > 79){
                setPopularOpacity(false);
                setBrownOpacity(false);
            } else if (points > 39){
                setPopularOpacity(false)
            }
        } else if ((age > 10 && age < 16) || age > 50){
            if (points >= 600){
                setAllBadges();
            } else if (points >= 300){
                setPopularOpacity(false);
                setBrownOpacity(false);
                setSilverOpacity(false);
            } else if (points >= 100){
                setPopularOpacity(false);
                setBrownOpacity(false);
            } else if (points >= 50){
                setPopularOpacity(false);
            }
        } else if (age > 15 && age < 51){
            if (points >= 720){
                setAllBadges();
            } else if (points >= 360){
                setPopularOpacity(false);
                setBrownOpacity(false);
                setSilverOpacity(false);
            } else if (points >= 120){
                setPopularOpacity(false);
                setBrownOpacity(false);
            } else if (points >= 60){
                setPopularOpacity(false);
            }
        }
    }


    useEffect(() => {
        setBadgesOpacity();
    }, [props.points])
    return (
        <Paper className={classes.badges}>
            <Typography className={classes.header} variant={'h3'}>YOUR BADGES</Typography>
            <div className={classes.images}>
            <img id={'popularna'} className={popularOpacity ? classes.opacity : undefined} src={popularna} alt=""/>
            <img id={'brazowa'} className={brownOpacity ? classes.opacity : undefined} src={brazowa} alt=""/>
            <img id={'srebrna'} className={silverOpacity ? classes.opacity : undefined} src={srebrna} alt=""/>
            <img id={'zlota'} className={goldOpacity ? classes.opacity : undefined} src={zlota} alt=""/>

            </div>
        </Paper>
    );
};

export default BadgesComponent;