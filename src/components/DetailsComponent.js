import React from 'react';
import Paper from '@material-ui/core/Paper';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const DetailsComponent = (props) => {
    return (
        <Paper  className={'content'}>
            <CircularProgressbar style={{width: '50%'}} value={props.points} text={`${props.points}%`} />

            <strong>Email: </strong>{props.currentUser.email}
            <br/>

            <strong>Name: </strong> {props.userFromDb && props.userFromDb.name}
            <br/>
            <strong>Age: </strong>{props.userFromDb && props.userFromDb.age}
            <br/>
            <strong>Points: </strong>{props.points}
            <br/>
        </Paper>
    );
};

export default DetailsComponent;