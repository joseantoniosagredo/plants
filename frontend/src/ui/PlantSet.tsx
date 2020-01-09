import React from 'react'
import { PlantType } from '../models/plant';
import Plant from './Plant';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import PlantCardContainer from '../containers/PlantCardContainer';

type Props = {
    plants: PlantType[]
}


const styles = makeStyles(theme => createStyles({
    root: {
        display: 'flex'
    }
}))

export default (props: Props) => {
    return <Grid container>
        {props.plants.map(plant => <PlantCardContainer plant={plant} />)}
    </Grid>
}