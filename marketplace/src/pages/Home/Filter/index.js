import React from 'react';
import Button from '../../../components/Button';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


import { Container } from './styles';

const Filter = (props) => {
    const {
        filterPrice,
        filterName,
        onChangeFilterName,
        onChangeFilterPrice
    } = props;

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="standard-basic"
                        label="Buscar por nome"
                        style={{ width: "100%" }}
                        value={filterName}
                        onChange={(e) => onChangeFilterName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography id="range-slider" gutterBottom>
                        Preço (R$)
                    </Typography>
                    <Slider
                        value={filterPrice}
                        onChange={(v, e) => onChangeFilterPrice(e)}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={200}
                    />
                </Grid>

            </Grid>
        </Container>
    );
}

export default Filter;
