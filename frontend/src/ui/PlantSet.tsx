import React from 'react'
import { PlantType } from '../store/models/plant';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Grid, Fab } from '@material-ui/core';
import PlantCardContainer from '../containers/PlantCardContainer';
import { Add } from '@material-ui/icons';
import NewPlantCardContainer from '../containers/NewPlantContainer';

type Props = {
    plants: PlantType[]
}


const styles = makeStyles(theme => createStyles({
    root: {
        display: 'flex'
    },
    fab: {
        position: 'fixed',
        bottom: 20,
        right: 20
    }
}))

export default (props: Props) => {
    const [newPlant, setNewPlant] = React.useState(false)
    const classes = styles()
    return <Grid container>
        {newPlant && <NewPlantCardContainer onCancel={() => setNewPlant(false)} />}
        {props.plants.map(plant => <PlantCardContainer plant={plant} />)}
        {!newPlant && <Fab className={classes.fab} color="primary" aria-label="add" onClick={() => setNewPlant(true)}>
            <Add />
        </Fab>}
    </Grid>
}