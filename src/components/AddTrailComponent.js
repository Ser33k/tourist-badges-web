import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';

import up from './images/up.png'
import down from './images/down.png'
import map from './images/map.png'

import {TRAILS as trails} from "../trails";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    form: {
        width: '100%'
    },
    input: {
        width: '100%',
        "& .MuiAutocomplete-endAdornment": {
            display: "none"
        },

    },
    firstInput: {
        "& > div": {
            backgroundColor: "white",
        }
    },
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        "& img": {
            height: 'auto',
            width: '10%'
        }
    },
    disabled: {
        backgroundColor: "#eff"
    },
    equation: {
        display: "flex",
        fontSize: "40px",
        justifyContent: "space-around",
        marginTop: "40px"
    },
    button: {
        background: "#A3D3FF",
        fontSize: "30px",
        marginTop: "40px",
        color: "#223E57",
        "&:hover": {
            backgroundColor: "#223E57",
            color: "#A3D3FF"
        }
    },
}))

const AddTrailComponent = (props) => {
    const classes = useStyles();

    const [trail, setTrail] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');


    const handleChangeTrail = (event) => {
        setTrail(event.target.value);
        setFrom('')
        setTo('')
    }


    const handleChangeFrom = (event) => {
        const value = trails.filter(t => t.to === trail)[0].entries.filter(t => event.target.value.includes(t.name))[0];
        setFrom(value);
    }

    const handleChangeTo = (event) => {
        const value = trails.filter(t => t.to === trail)[0].descending.filter(t => event.target.value.includes(t.name))[0];
        console.log(value)
        setTo(value);
    }


    const addTrail = (e) => {
        e.preventDefault();
        props.handleAddTrail(trail, from, to);

        setTo(null)
        setFrom(null)
        setTrail({})

    }
    const isTrailSelected = trails.some(t => t.to === trail);

    return (
        <>
            <div className={'content'}>
                <div className={classes.img}>
                    <img src={map} alt=""/>
                </div>
                <form className={classes.form} onSubmit={addTrail}>
                    <Autocomplete
                        id="free-solo-demo"
                        options={trails.map((option) => option.to)}
                        className={`${classes.input} ${classes.firstInput}`}
                        disableClearable
                        disableListWrap

                        renderInput={(params) => (
                            <TextField {...params} onSelect={handleChangeTrail} onChange={handleChangeTrail}
                                       label="Trail" value={trail} margin="normal" fullWidth variant="outlined"/>
                        )}
                    />
                    <Autocomplete
                        id="free-solo-demo"
                        options={isTrailSelected ? trails.filter(t => t.to === trail)[0].entries.map(trail => `${trail.name} - ${trail.score} pt.`) : []}
                        className={classes.input}
                        disableClearable
                        disabled={!isTrailSelected}
                        renderInput={(params) => (
                            <TextField  {...params} value={from && from.name} style={!isTrailSelected ?
                                {backgroundColor: "#f1f0f0"} : {backgroundColor: "white"}} onSelect={handleChangeFrom}
                                        onChange={handleChangeFrom}  label="From" margin="normal" variant="outlined"/>
                        )}
                    />
                    <Autocomplete
                        id="free-solo-demo"
                        // options={trails.map((option) => option.to)}
                        options={isTrailSelected ? trails.filter(t => t.to === trail)[0].descending.map(trail => `${trail.name} - ${trail.score} pt.`) : []}
                        disableClearable
                        disabled={!isTrailSelected}
                        className={classes.input}
                        renderInput={(params) => (
                            <TextField {...params} style={!isTrailSelected ?
                                {backgroundColor: "#f1f0f0"} : {backgroundColor: "white"}} onSelect={handleChangeTo}
                                       onChange={handleChangeTo}  label="To" margin="normal" fullWidth
                                       variant="outlined"/>
                        )}
                    />

                    {from && to &&
                    <div className={classes.equation}>
                        <div className={classes.img}>
                            <img src={up} alt=""/>
                        </div>
                        +
                        <div className={classes.img}>
                            <img src={down} alt=""/>
                        </div>
                        =
                        <div>
                            <strong>{from.score + to.score}</strong>
                        </div>
                    </div>
                    }

                    {props.success && <Alert severity="success">Trail added successfully!</Alert>}
                    <Button type={'submit'} variant={"contained"} color={"primary"} className={classes.button}>Add
                        Trail</Button>

                </form>


            </div>
        </>
    );
};

export default AddTrailComponent;