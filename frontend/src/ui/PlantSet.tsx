import React from 'react'
import { PlantType } from '../models/plant';
import Plant from './Plant';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Grid, Fab } from '@material-ui/core';
import PlantCardContainer from '../containers/PlantCardContainer';
import { Add } from '@material-ui/icons';

type Props = {
    plants: PlantType[]
}


const styles = makeStyles(theme => createStyles({
    root: {
        display: 'flex'
    }
}))

export default (props: Props) => {
    const [newPlant, setNewPlant] = React.useState(false)
    return <Grid container>
        {newPlant && <PlantCardContainer new onCancel={() => setNewPlant(false)} />}
        {props.plants.map(plant => <PlantCardContainer plant={plant} />)}
        <Fab style={{ display: 'flex', button: 20, right: 20 }} color="primary" aria-label="add" onClick={() => setNewPlant(true)}>
            <Add />
        </Fab>
    </Grid>
}