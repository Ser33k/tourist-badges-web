import React, {useState} from 'react';
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


//         font-size: 72px;
// background: -webkit-linear-gradient(#eee, #333);
// -webkit-background-clip: text;
// -webkit-text-fill-color: transparent;
    }

}));


const BadgesComponent = () => {
    const classes = useStyles();

    const [popularOpacity, setPopularOpacity] = useState(false);
    const [brownOpacity, setBrownOpacity] = useState(true);
    const [silverOpacity, setSilverOpacity] = useState(true);
    const [goldOpacity, setGoldOpacity] = useState(true);

    return (
        <Paper className={classes.badges}>
            <Typography className={classes.header} variant={'h3'}>Your badges</Typography>
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