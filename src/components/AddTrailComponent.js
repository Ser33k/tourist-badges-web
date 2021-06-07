import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {TRAILS as trails} from "../trails";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%'
    },
    input:{
        "& .MuiAutocomplete-endAdornment": {
            display: "none"
        }
    },
    disabled: {
        backgroundColor: "#ddd"
    }
}))

const AddTrailComponent = () => {
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
        const value = trails.filter(t => t.to === trail)[0].entries.filter(t => event.target.value === t.name)[0];
        setFrom(value);
    }

    const handleChangeTo = (event) => {
        const value = trails.filter(t => t.to === trail)[0].descending.filter(t => event.target.value === t.name)[0];
        console.log(value)
        setTo(value);
    }

    const isTrailChoose = trails.some(t => t.to === trail);
    console.log(isTrailChoose)

    return (
        <Paper className={'content'}>
            <p>{from && from.score}</p>
            <p>{to && to.score}</p>
            <form className={classes.form}>
                <Autocomplete
                    id="free-solo-demo"
                    options={trails.map((option) => option.to)}
                    className={classes.input}
                    fullWidth
                    disableClearable
                    disableListWrap
                    renderInput={(params) => (
                        <TextField {...params} onSelect={handleChangeTrail} onChange={handleChangeTrail} label="Trail" margin="normal" fullWidth variant="outlined" />
                    )}
                />
                <Autocomplete
                    id="free-solo-demo"
                    options={isTrailChoose ? trails.filter(t => t.to === trail)[0].entries.map(trail => trail.name) : undefined}

                    className={classes.input}
                    fullWidth
                    disableClearable
                    disabled={!isTrailChoose}
                    renderInput={(params) => (
                        <TextField  {...params} className={!isTrailChoose ? classes.disabled : undefined} onSelect={handleChangeFrom} onChange={handleChangeFrom} label="From" margin="normal" fullWidth variant="outlined" />
                    )}
                />
                <Autocomplete
                    id="free-solo-demo"
                    // options={trails.map((option) => option.to)}
                    options={isTrailChoose ? trails.filter(t => t.to === trail)[0].descending.map(trail => trail.name) : undefined}
                    fullWidth
                    disableClearable
                    disabled={!isTrailChoose}
                    className={classes.input}
                    renderInput={(params) => (
                        <TextField {...params} className={!isTrailChoose ? classes.disabled : undefined} onSelect={handleChangeTo} onChange={handleChangeTo} label="To" margin="normal" fullWidth variant="outlined" />
                    )}
                />


                {/*<InputLabel id="demo-customized-select-label">Trail</InputLabel>*/}
                {/*<Select*/}
                {/*    labelId="demo-customized-select-label"*/}
                {/*    id="demo-customized-select"*/}
                {/*    value={trail}*/}
                {/*    onChange={handleChangeTrail}*/}
                {/*    input={<BootstrapInput/>}*/}
                {/*>*/}
                {/*    <MenuItem value="">*/}
                {/*        <em>None</em>*/}
                {/*    </MenuItem>*/}
                {/*    {trails.map(trail => <MenuItem value={trail.to}>{trail.to}</MenuItem>)}*/}
                {/*    /!*<MenuItem value={10}>Ten</MenuItem>*!/*/}
                {/*    /!*<MenuItem value={20}>Twenty</MenuItem>*!/*/}
                {/*    /!*<MenuItem value={30}>Thirty</MenuItem>*!/*/}
                {/*</Select>*/}

                {/*{trail !== '' ?*/}
                {/*    (*/}
                {/*        <>*/}
                {/*            <InputLabel id="demo-customized-select-label">From</InputLabel>*/}
                {/*            <Select*/}
                {/*                labelId="demo-customized-select-label"*/}
                {/*                id="demo-customized-select1"*/}
                {/*                value={from}*/}
                {/*                onChange={handleChangeFrom}*/}
                {/*                input={<BootstrapInput/>}*/}

                {/*            >*/}
                {/*                <MenuItem value="">*/}
                {/*                    <em>None</em>*/}
                {/*                </MenuItem>*/}
                {/*                {trails.filter(t => t.to === trail)[0].entries.map(trail => <MenuItem*/}
                {/*                    value={trail}>{trail.name}</MenuItem>)}*/}
                {/*            </Select>*/}
                {/*            <p>{from.score}</p>*/}

                {/*            <InputLabel id="demo-customized-select-label">To</InputLabel>*/}
                {/*            <Select*/}
                {/*                labelId="demo-customized-select-label"*/}
                {/*                id="demo-customized-select1"*/}
                {/*                value={to}*/}
                {/*                onChange={handleChangeTo}*/}
                {/*                input={<BootstrapInput/>}*/}

                {/*            >*/}
                {/*                <MenuItem value="">*/}
                {/*                    <em>None</em>*/}
                {/*                </MenuItem>*/}
                {/*                {trails.filter(t => t.to === trail)[0].descending.map(trail => <MenuItem*/}
                {/*                    value={trail}>{trail.name}</MenuItem>)}*/}
                {/*                /!*<MenuItem value={10}>Ten</MenuItem>*!/*/}
                {/*                /!*<MenuItem value={20}>Twenty</MenuItem>*!/*/}
                {/*                /!*<MenuItem value={30}>Thirty</MenuItem>*!/*/}
                {/*            </Select>*/}
                {/*            <p>{to.score}</p>*/}
                {/*        </>*/}
                {/*    )*/}

                {/*    :*/}

                {/*    null*/}
                {/*}*/}

            </form>
        </Paper>
    );
};

export default AddTrailComponent;