import React, { useState } from 'react'
import { PlantType } from '../models/plant';
import { imageURL } from '../utils/const';
import { Typography, Paper, makeStyles, createStyles, Button, Grid, Input, Card, CardHeader, IconButton, CardActions } from '@material-ui/core';
import { Edit } from '@material-ui/icons'
export type PlantProps = {
    onSubmit: () => void,
    nameRef: React.RefObject<HTMLInputElement>
    fileRef: React.RefObject<HTMLInputElement>
} & (NewProps | PropsPlant)

type PropsPlant = {
    new?: false
    plant: PlantType
}
type NewProps = {
    new: true,
    onCancel: () => void
}
const styles = makeStyles(theme => createStyles({
    root: {
        //maxWidth: 200
    }
}))

export default (props: PlantProps) => {

    const classes = styles()
    const [edit, setEdit] = useState(props.new === true)
    const onSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.onSubmit()
    }, [props.onSubmit])
    return <Grid className={classes.root}>
        <Card>
            <form onSubmit={onSubmit}>
                {!props.new ? <React.Fragment>
                    <CardHeader title={props.plant !== null ? props.plant.name : 'New'} action={<IconButton onClick={() => setEdit(!edit)}>
                        {props.plant && <Edit />}
                    </IconButton>} />
                    {props.plant && <image href={props.plant.mainPicture ? imageURL(props.plant.mainPicture) : undefined} />}
                    {edit && <React.Fragment>
                        <Input inputRef={props.nameRef} placeholder='Name'></Input>
                        <Input inputRef={props.fileRef} type='file' placeholder='Picture'></Input>
                    </React.Fragment>}
                    <CardActions>
                        {edit && <React.Fragment>
                            <Button type='submit'>Save</Button>

                        </React.Fragment>}
                    </CardActions>
                </React.Fragment> : <React.Fragment>
                        <Button onClick={() => props.onCancel()}>Cancel</Button> : <Button onClick={() => setEdit(false)}>Cancel</Button>
                    </React.Fragment>}
            </form>
        </Card>
    </Grid>
}