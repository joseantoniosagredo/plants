import React from 'react'
import { Card, CardHeader, IconButton, CardContent, CardActions, TextField, Input } from '@material-ui/core';
import { CancelOutlined, Done } from '@material-ui/icons';
import { useStylesCard } from './PlantUI';

type Props = {
    nameRef?: React.RefObject<HTMLInputElement>
    fileRef?: React.RefObject<HTMLInputElement>
    onSubmit: () => void
    onCancel: () => void
}

export default function (props: Props) {
    const classes = useStylesCard();

    return <Card className={classes.card}>
        <CardHeader
            action={
                <IconButton onClick={props.onCancel} aria-label="cancel">
                    <CancelOutlined />
                </IconButton>
            }
            title={'New Plant'}
            subheader={'Add new plant'}
        />

        <CardContent>
            <Input inputRef={props.fileRef} type='file' placeholder='Picture'></Input>
            <TextField label='Name' inputRef={props.nameRef} />
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="Accept" onClick={props.onSubmit}>
                <Done />
            </IconButton>
        </CardActions>
    </Card>
}