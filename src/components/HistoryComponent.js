import React from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    scrollbar: {
        "&::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.3)",
            backgroundColor: "#eee",
            borderRadius: "10px",
        },
        "&::-webkit-scrollbar": {
            width: "10px",
            backgroundColor: "#eee",
            borderRadius: "10px"
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            backgroundImage: `-webkit-gradient(linear,
            left bottom,
            left top,
            color-stop(0.2, rgb(73,125,189)),
            color-stop(0.5, rgb(73,125,189)),
            color-stop(0.75, rgb(73,125,189)))`
        }
    },
    list: {
        listStyle: "none",
        margin: 0,
        padding: 10
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '50.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    root: {
        width: "100%",

    },

    accordionSummary: {
        "& .MuiIconButton-root": {
            width: "40px"
        },
        backgroundColor: "#BC6EC",
        backgroundImage: 'linear-gradient(180deg, rgba(163,211,255,0.7) 0%, rgba(163,211,255,0.3) 70%, #FFF 100%)',
        borderRadius: "3px"

},
    listItem: {
        marginBottom: "5px",
        borderRadius: "10px"
    }
}))


const HistoryComponent = (props) => {

    const classes = useStyles();

    return (
        <Paper className={'content'}>
            {/*<h2>HISTORY</h2>*/}
            <ul className={`${classes.scrollbar} ${classes.list}`} style={{maxHeight: '100%', overflow: 'auto'}}>
            {props.history.length > 0 ? props.history.map((el,index) => (<li key={index} className={classes.listItem}>
                {/*<p>Destination: {el.mainDestination}</p>*/}
                {/*<p>From: {el.from}</p>*/}
                {/*<p>To: {el.to}</p>*/}

                {/*<p>Sum: {el.sum}</p>*/}

                <Accordion className={classes.accordion}>
                    <AccordionSummary
                        className={classes.accordionSummary}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>{el.mainDestination}</Typography>
                        <Typography className={classes.secondaryHeading}>{new Date(el.timestamp).toString().slice(4,21)}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography style={{textAlign: "left"}}>
                            <strong>From: </strong> {el.from}
                            <br/>
                            <strong>To: </strong> {el.to}
                            <br/>
                            <strong>Points: </strong> {el.sum}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </li>)) : <h2>History</h2>}



            </ul>
        </Paper>
    );
};

export default HistoryComponent;