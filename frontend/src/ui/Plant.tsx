import React, { useState } from 'react'
import { PlantType } from '../models/plant';
import { imageURL } from '../utils/const';
import { Typography, Paper, makeStyles, createStyles, Button, Grid, Input, Card, CardHeader, IconButton, CardActions } from '@material-ui/core';
import { Edit } from '@material-ui/icons'
type Props = {
    plant: PlantType
    new?: boolean,
    onSubmit: () => void,
    nameRef:React.RefObject<HTMLInputElement>
    fileRef:React.RefObject<HTMLInputElement>
}

const styles = makeStyles(theme => createStyles({
    root: {
        //maxWidth: 200
    }
}))

export default (props: Props) => {
    const classes = styles()
    const [edit, setEdit] = useState(props.new ? props.new : false)
    const onSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        props.onSubmit()
    },[props.onSubmit])
    return <Grid className={classes.root}>
        <Card>
            <form onSubmit={onSubmit}>
                <CardHeader title={props.plant.name} action={<IconButton onClick={() => setEdit(!edit)}>
                    <Edit />
                </IconButton>} />
                <image href={props.plant.mainPicture ? imageURL(props.plant.mainPicture) : undefined} />
                {edit && <React.Fragment>
                    <Input inputRef={props.nameRef} placeholder='Name'></Input>
                    <Input inputRef={props.fileRef} type='file' placeholder='Picture'></Input>
                </React.Fragment>}
                <CardActions>
                    {edit && <React.Fragment>
                        <Button type='submit'>Save</Button>
                        <Button onClick={() => setEdit(false)}>Cancel</Button>
                    </React.Fragment>}
                </CardActions>
            </form>
        </Card>
    </Grid>
}